import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { format, startOfDay, endOfDay } from 'date-fns';
import { getPbxStatisticsByIdQuery, getPbxStatisticsQuery } from '@app/common/constants/sql';
import { LicensesService } from '@app/modules/licenses/services/licenses.service';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { PbxCallStatisticsData, TransformedPbxCallStatisticsData } from '../interfaces/call-analytics.interface';
import { PbxCallStatistics } from '../entities/pbx-call-statistics.entity';
import { ConfigService } from '@nestjs/config';
import { CallDirection } from '../interfaces/call-analytics.enum';
import { DaDataPhoneObj } from '@app/modules/dadata-api/interfaces/dadata-api.interface';
import { DadataTypes, SuggestionsStatus } from '@app/modules/dadata-api/interfaces/dadata-api.enum';
import { DadataApiService } from '@app/modules/dadata-api/services/dadata-api.service';

@Injectable()
export class SyncPbxCallStatisticsSchedule {
    constructor(
        @InjectRepository(PbxCallStatistics)
        private pbxCallStatisticsRepository: Repository<PbxCallStatistics>,
        private readonly pacSqlService: PacSqlService,
        private readonly licensesService: LicensesService,
        private readonly configService: ConfigService,
        private readonly dadataApiService: DadataApiService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async syncExtensionAnalitic() {
        const license = await this.licensesService.getLicenses();

        if (!license.isActive) return;

        if (!license.products.some((p) => (p.productType = ProductType.analitic))) return;

        await this.getPbxCallStatistics(license.client.clientId);
    }

    private async getPbxCallStatistics(clientId: number) {
        const query = await this.getQuery();

        const pbxCallStatistics = await this._getPbxCallStatistics(clientId, query);

        if (!pbxCallStatistics) return;

        const aggregatedData = this.aggregatePbxCallStatisticsData(JSON.parse(pbxCallStatistics));

        const callsData = await this.addAditionalCallInfo(aggregatedData);

        for (const call of callsData) {
            await this.addPbxCallStatistic(call);
        }
    }

    private async addPbxCallStatistic(data: TransformedPbxCallStatisticsData) {
        try {
            await this.pbxCallStatisticsRepository.upsert(
                {
                    callId: data.callId,
                    callDirection: data.callDirection,
                    answered: data.answered,
                    destinationCallerId: data.destinationCallerId,
                    destinationDisplayName: data.destinationDisplayName,
                    destinationDn: data.destinationDn,
                    reason: data.reason,
                    ringingDuration: data.ringingDuration,
                    sourceCallerId: data.sourceCallerId,
                    sourceDisplayName: data.sourceDisplayName,
                    sourceDn: data.sourceDn,
                    startTime: data.startTime,
                    talkingDuration: data.talkingDuration,
                    recordingUrl: data.recordingUrl,
                    segmentId: data.segmentId,
                    country: data.country,
                    city: data.city,
                    region: data.region,
                },
                ['segmentId'],
            );
        } catch (e) {
            return;
        }
    }

    private async getQuery(): Promise<string> {
        const existsStatistics = await this.pbxCallStatisticsRepository
            .createQueryBuilder('pbx_call_statistics')
            .orderBy('pbx_call_statistics.id', 'DESC')
            .getOne();

        const date = this.getStartAndToday();

        return existsStatistics
            ? getPbxStatisticsByIdQuery(date.formattedStart, date.formattedEnd, existsStatistics.callId)
            : getPbxStatisticsQuery(date.formattedStart, date.formattedEnd);
    }

    private async _getPbxCallStatistics(clientId: number, query: string) {
        const result = await this.pacSqlService.sqlRequest(clientId, { query });

        const parseResult = JSON.parse(result.result);

        return parseResult[0][0];
    }

    private getStartAndToday() {
        const now = new Date();

        const startOfToday = startOfDay(now);

        const endOfToday = endOfDay(now);

        return {
            formattedStart: format(startOfToday, 'yyyy-MM-dd HH:mm:ss+00'),
            formattedEnd: format(endOfToday, 'yyyy-MM-dd HH:mm:ss+00'),
        };
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

    private async addAditionalCallInfo(data: TransformedPbxCallStatisticsData[]): Promise<TransformedPbxCallStatisticsData[]> {
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
}
