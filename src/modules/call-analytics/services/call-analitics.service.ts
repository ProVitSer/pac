import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallAnalytics } from '../entities/call-analytics.entity';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { format, startOfDay, endOfDay } from 'date-fns';
import {
    CallDirection,
    PbxCallStatisticsData,
    PbxExtensionsStatisticsData,
    TransformedPbxCallStatisticsData,
    TransformedPbxExtensionsStatisticsData,
} from '../interfaces/call-analytics.enum';
import { ConfigService } from '@nestjs/config';
import { DadataTypes, SuggestionsStatus } from '@app/modules/dadata-api/interfaces/dadata-api.enum';
import { DaDataPhoneObj } from '@app/modules/dadata-api/interfaces/dadata-api.interface';
import { DadataApiService } from '@app/modules/dadata-api/services/dadata-api.service';
import { getExtensionStatisticsQuery, getPbxStatisticsQuery } from '@app/common/constants/sql';
@Injectable()
export class CallAnaliticsService {
    constructor(
        @InjectRepository(CallAnalytics)
        private callAnalyticsHandlerRepository: Repository<CallAnalytics>,
        private readonly pacSqlService: PacSqlService,
        private readonly configService: ConfigService,
        private readonly dadataApiService: DadataApiService,
    ) {}

    public async addCall(data: Partial<CallAnalytics>): Promise<void> {
        const ca = this.callAnalyticsHandlerRepository.create(data);
        await this.callAnalyticsHandlerRepository.save(ca);
    }

    public async getPbxExtensionStatistics(clientId: number) {
        await this.pbxStatustics(clientId);

        const now = new Date();

        const startOfToday = startOfDay(now);

        const endOfToday = endOfDay(now);

        const formattedStart = format(startOfToday, 'yyyy-MM-dd HH:mm:ss+00');

        const formattedEnd = format(endOfToday, 'yyyy-MM-dd HH:mm:ss+00');

        const result = await this.pacSqlService.sqlRequest(clientId, { query: getExtensionStatisticsQuery(formattedStart, formattedEnd) });

        const parseResult = JSON.parse(result.result);

        const jsonData = JSON.parse(parseResult[0][0]);

        const aggregatedData = this.aggregatePbxExtensionsData(jsonData);

        const topRecords = this.getTopRecords(aggregatedData);

        console.log(topRecords);
    }

    public async pbxStatustics(clientId: number) {
        const now = new Date();

        const startOfToday = startOfDay(now);

        const endOfToday = endOfDay(now);

        const formattedStart = format(startOfToday, 'yyyy-MM-dd HH:mm:ss+00');

        const formattedEnd = format(endOfToday, 'yyyy-MM-dd HH:mm:ss+00');

        const result = await this.pacSqlService.sqlRequest(clientId, { query: getPbxStatisticsQuery(formattedStart, formattedEnd) });

        const parseResult = JSON.parse(result.result);

        const jsonData = JSON.parse(parseResult[0][0]);

        const aggregatedData = this.aggregatePbxCallStatisticsData(jsonData);

        const analizeCall = await this.analyzeCalls(aggregatedData);

        console.log(JSON.stringify(this.generateAnalytics(analizeCall)));
    }

    private aggregatePbxCallStatisticsData(data: PbxCallStatisticsData[]): TransformedPbxCallStatisticsData[] {
        const aggregatedMap: TransformedPbxCallStatisticsData[] = [];

        const pbx = this.configService.get('pbx');
        for (const callData of data) {
            aggregatedMap.push({
                callId: callData.call_id,
                answered: callData.answered,
                destinationCallerId: callData.destination_caller_id,
                destinationDisplayName: callData.destination_display_name,
                destinationDn: callData.destination_dn,
                reason: callData.reason,
                ringingDuration: callData.ringing_duration,
                sourceCallerId: callData.source_caller_id,
                sourceDisplayName: callData.source_display_name,
                sourceDn: callData.source_dn,
                startTime: callData.start_time,
                talkingDuration: callData.talking_duration,
                recordingUrl: callData.recording_url ? `${pbx.recordingPath}/${callData.recording_url}` : null,
                segmentId: callData.segment_id,
            });
        }

        return aggregatedMap;
    }
    private async analyzeCalls(data: TransformedPbxCallStatisticsData[]) {
        // Группируем вызовы по уникальному callId
        const callsByCallId = data.reduce((acc, call) => {
            if (!acc[call.callId]) acc[call.callId] = [];
            acc[call.callId].push(call);
            return acc;
        }, {});

        // Обрабатываем каждый вызов по callId
        for (const callId in callsByCallId) {
            const calls = callsByCallId[callId];

            // Находим вызов с минимальным segmentId для анализа
            const baseCall = calls.reduce((min, call) => (call.segmentId < min.segmentId ? call : min), calls[0]);

            // Определяем направление вызова на основе условия
            if (baseCall.sourceDn.length > 3 && baseCall.destinationDn.length === 3) {
                let phoneData: DaDataPhoneObj | undefined;

                if (baseCall.sourceCallerId.length > 7) {
                    phoneData = await this.getPhoneData(baseCall.sourceCallerId);
                }

                for (const call of calls) {
                    call.callDirection = CallDirection.incoming;
                    call.country = phoneData?.country || '';
                    call.region = phoneData?.region || '';
                    call.city = phoneData?.city || '';
                }
            } else if (baseCall.sourceDn.length === 3 && baseCall.destinationDn.length > 3) {
                let phoneData: DaDataPhoneObj | undefined;

                if (baseCall.destinationCallerId.length > 7) {
                    phoneData = await this.getPhoneData(baseCall.destinationCallerId);
                }

                for (const call of calls) {
                    call.callDirection = CallDirection.outgoing;
                    call.country = phoneData?.country || '';
                    call.region = phoneData?.region || '';
                    call.city = phoneData?.city || '';
                }
            } else if (baseCall.sourceDn.length === 3 && baseCall.destinationDn.length === 3) {
                for (const call of calls) {
                    call.callDirection = CallDirection.local;
                }
            }
        }

        // Проверяем, что у всех вызовов добавлено callDirection
        for (const call of data) {
            if (!call.callDirection) {
                call.callDirection = CallDirection.unknown;
            }
        }

        return data;
    }

    private async getPhoneData(clientNumber: string): Promise<DaDataPhoneObj | undefined> {
        try {
            const dadataData = {
                type: DadataTypes.PHONE,
                suggestions: SuggestionsStatus.NO,
                query: clientNumber,
            };
            const phoneData = await this.dadataApiService.getDadataInfo<DaDataPhoneObj[]>(dadataData);

            return phoneData.length > 0 ? phoneData[0] : undefined;
        } catch (e) {
            return;
        }
    }

    private parseDuration(duration: string | null): number {
        if (!duration) return 0;
        const [hours, minutes, seconds] = duration.split(':').map(Number);
        return (hours || 0) * 3600 + (minutes || 0) * 60 + (seconds || 0);
    }

    private aggregatePbxExtensionsData(data: PbxExtensionsStatisticsData[]): TransformedPbxExtensionsStatisticsData[] {
        const aggregatedMap: { [key: string]: TransformedPbxExtensionsStatisticsData } = {};

        data.forEach((item) => {
            const extension = item.dn_;
            const displayName = item.display_name_;

            if (!aggregatedMap[extension]) {
                aggregatedMap[extension] = {
                    extension,
                    displayName,
                    inboundAnsweredCount: 0,
                    inboundUnansweredCount: 0,
                    outboundCallCount: 0,
                    callTalkingDur: 0,
                };
            }

            const record = aggregatedMap[extension];

            record.inboundAnsweredCount += item.inbound_answered_count_ || 0;
            record.inboundUnansweredCount += item.inbound_unanswered_count_ || 0;
            record.outboundCallCount += (item.outbound_answered_count_ || 0) + (item.outbound_unanswered_count_ || 0);
            record.callTalkingDur +=
                this.parseDuration(item.inbound_answered_talking_dur_) + this.parseDuration(item.outbound_answered_talking_dur_);
        });

        return Object.values(aggregatedMap);
    }

    private getTopRecords(transformedData: TransformedPbxExtensionsStatisticsData[]) {
        const maxInboundUnanswered = [...transformedData]
            .sort((a, b) => b.inboundUnansweredCount - a.inboundUnansweredCount)
            .slice(0, 6)
            .map((record) => ({ ...record, callTalkingDur: this.formatDuration(record.callTalkingDur) }));

        const maxCallTalkingDur = [...transformedData]
            .sort((a, b) => b.callTalkingDur - a.callTalkingDur)
            .slice(0, 6)
            .map((record) => ({ ...record, callTalkingDur: this.formatDuration(record.callTalkingDur) }));

        const maxInboundAnswered = [...transformedData]
            .sort((a, b) => b.inboundAnsweredCount - a.inboundAnsweredCount)
            .slice(0, 6)
            .map((record) => ({ ...record, callTalkingDur: this.formatDuration(record.callTalkingDur) }));

        return { maxInboundUnanswered, maxCallTalkingDur, maxInboundAnswered };
    }

    private formatDuration(seconds: number): string {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    private generateAnalytics(callData: TransformedPbxCallStatisticsData[]) {
        const filteredCalls = this.filterCallsBySegment(this.aggregateCallDurations(callData));

        const hourlyStats = {};

        for (const call of filteredCalls) {
            const hour = this.getHourFromDate(call.startTime);
            if (!hourlyStats[hour]) {
                hourlyStats[hour] = {
                    local: { totalCalls: 0, extensions: {} },
                    incoming: {
                        totalCalls: 0,
                        cities: {},
                        regions: {},
                        totalDuration: 0,
                        totalRingingDuration: 0,
                        totalAnsweredCalls: 0,
                        totalUnansweredCalls: 0,
                    },
                    outgoing: {
                        totalCalls: 0,
                        cities: {},
                        regions: {},
                        totalDuration: 0,
                        totalRingingDuration: 0,
                        totalAnsweredCalls: 0,
                        totalUnansweredCalls: 0,
                    },
                };
            }

            const hourlyData = hourlyStats[hour];

            switch (call.callDirection) {
                case 'local':
                    this.processLocalCall(hourlyData.local, call);
                    break;

                case 'incoming':
                    this.processIncomingOrOutgoingCall(hourlyData.incoming, call);
                    break;

                case 'outgoing':
                    this.processIncomingOrOutgoingCall(hourlyData.outgoing, call);
                    break;
            }
        }

        return hourlyStats;
    }

    private processLocalCall(localData: any, call: any) {
        const { sourceDn, talkingDuration } = call;
        if (!localData.extensions[sourceDn]) {
            localData.extensions[sourceDn] = { callCount: 0, totalTalkingDuration: 0 };
        }

        localData.totalCalls++;
        localData.extensions[sourceDn].callCount++;
        localData.extensions[sourceDn].totalTalkingDuration += this.convertDurationToSeconds(talkingDuration);
    }

    private processIncomingOrOutgoingCall(callData: any, call: any) {
        callData.totalCalls++;
        callData.totalDuration += call.totalTalkingDuration;
        callData.totalRingingDuration += call.totalRingingDuration;

        if (call.answered) {
            callData.totalAnsweredCalls++;
        } else {
            callData.totalUnansweredCalls++;
        }

        if (call.city) {
            if (!callData.cities[call.city]) {
                callData.cities[call.city] = 0;
            }
            callData.cities[call.city]++;
        }

        if (call.region) {
            if (!callData.regions[call.region]) {
                callData.regions[call.region] = 0;
            }
            callData.regions[call.region]++;
        }

        if (!callData.callsById) callData.callsById = {};
        if (!callData.callsById[call.callId]) {
            callData.callsById[call.callId] = {
                answered: call.answered,
                talkingDuration: call.totalTalkingDuration,
                ringingDuration: call.totalRingingDuration,
            };
        }
    }

    private getHourFromDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toISOString().split(':')[0]; // "2024-11-01T16"
    }

    private convertDurationToSeconds(duration: string): number {
        const [hours, minutes, seconds] = duration.split(':').map(parseFloat);
        return hours * 3600 + minutes * 60 + seconds;
    }

    private aggregateCallDurations(callData: Array<any>): Array<any> {
        const callDurations = new Map<string, any>();

        for (const call of callData) {
            const { callId, talkingDuration, ringingDuration, answered, segmentId } = call;

            const formatTalkingDuration = this.convertDurationToSeconds(talkingDuration);
            const formatRingingDuration = this.convertDurationToSeconds(ringingDuration);

            if (!callDurations.has(callId)) {
                callDurations.set(callId, {
                    ...call,
                    totalTalkingDuration: formatTalkingDuration,
                    totalRingingDuration: formatRingingDuration,
                });
            } else {
                const existingCall = callDurations.get(callId);
                existingCall.totalTalkingDuration += formatTalkingDuration;
                existingCall.totalRingingDuration += formatRingingDuration;
                if (segmentId < existingCall.segmentId) {
                    existingCall.segmentId = segmentId;
                    existingCall.startTime = call.startTime;
                }
            }
        }

        return Array.from(callDurations.values());
    }

    private filterCallsBySegment(callData: Array<any>): Array<any> {
        const uniqueCalls = new Map<string, any>();

        for (const call of callData) {
            const { callId, segmentId } = call;
            if (!uniqueCalls.has(callId) || segmentId < uniqueCalls.get(callId).segmentId) {
                uniqueCalls.set(callId, call);
            }
        }

        return Array.from(uniqueCalls.values());
    }
}
