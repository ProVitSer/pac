import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, Timeout } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PbxCallStatistics } from '../entities/pbx-call-statistics.entity';
import { DAILY_CALL_ANALITICS_DEFAULT_STR, HOURLY_CALL_ANALITICS_DEFAULT_STR } from '../call-analitics.constants';
import { addHours, format, startOfHour, subDays, subHours } from 'date-fns';
import { HourlyAnalitics } from '../entities/hourly-analytics.entity';
import { DailyAnalicsData, HourlyAnalicsData } from '../interfaces/call-analytics.interface';
import { CallDirection } from '../interfaces/call-analytics.enum';
import { _ } from 'lodash';
import { DailyAnalitics } from '../entities/daily-analytics.entity';

@Injectable()
export class SyncAnaliticsSchedule {
    constructor(
        @InjectRepository(PbxCallStatistics)
        private pbxCallStatisticsRepository: Repository<PbxCallStatistics>,
        @InjectRepository(HourlyAnalitics)
        private hourlyAnaliticsRepository: Repository<HourlyAnalitics>,
        @InjectRepository(DailyAnalitics)
        private dailyAnaliticsRepository: Repository<DailyAnalitics>,
    ) {}

    @Cron(CronExpression.EVERY_HOUR)
    async syncHourlyAnalitic() {
        await this._syncHourlyAnalitic(new Date(Date.now() - 60 * 60 * 1000), new Date());
    }

    // @Timeout(5000)
    // async initProjSyncHourlyAnalitic() {
    //     await this._initProjSyncByHourlyAnalitic();
    // }

    private async _initProjSyncByHourlyAnalitic() {
        const intervals = this.getHourlyIntervalsForWeek();

        const hourlyStatistics = await Promise.all(intervals.map((interval) => this.getHourlyStatisticByInterval(interval)));

        for (const hourlyStatistic of hourlyStatistics) {
            await this.processHourlyStatistic(hourlyStatistic);
        }
    }

    private async processHourlyStatistic(hourlyStatistic: { start: Date; end: Date; callIds: number[] }) {
        const { callIds, start, end } = hourlyStatistic;

        const reportDate = format(start, 'yyyy-MM-dd');

        const reportHour = end.getUTCHours();

        if (callIds.length === 0) {
            await this.addHourlyAnalitic(callIds, HOURLY_CALL_ANALITICS_DEFAULT_STR, reportDate, reportHour);
            return;
        }

        const statistics = await this.getStatisticsByCallIds(callIds);

        const analitics = this.generateAnalytics(statistics);

        await this.addHourlyAnalitic(callIds, analitics, reportDate, reportHour);
    }

    private async getHourlyStatisticByInterval(interval: { startDateTime: Date; endDateTime: Date }) {
        const uniqueCallIds = await this.getUniqueCallIdsForLastHour(interval.startDateTime, interval.endDateTime);

        const filterCallIds = uniqueCallIds.length !== 0 ? await this.filterCallIds(uniqueCallIds) : uniqueCallIds;

        return {
            start: interval.startDateTime,
            end: interval.endDateTime,
            callIds: filterCallIds,
        };
    }

    private async _syncHourlyAnalitic(startDateTime: Date, endDateTime: Date) {
        const currentHour = startOfHour(endDateTime);

        const lastHour = subHours(currentHour, 1);

        const callIds = await this.getUniqueCallIdsForLastHour(startDateTime, endDateTime);

        const reportDate = lastHour.toISOString().slice(0, 10);

        const reportHour = lastHour.getUTCHours();

        const filterCallIds = callIds.length !== 0 ? await this.filterCallIds(callIds) : callIds;

        const analiticsData =
            filterCallIds.length === 0
                ? HOURLY_CALL_ANALITICS_DEFAULT_STR
                : this.generateAnalytics(await this.getStatisticsByCallIds(filterCallIds));

        await this.addHourlyAnalitic(filterCallIds, analiticsData, reportDate, reportHour);
    }

    private async filterCallIds(callIds: number[]) {
        console.log(callIds);
        const lastHourlyAnalitics = await this.hourlyAnaliticsRepository
            .createQueryBuilder('hourly_analitics')
            .orderBy('hourly_analitics.id', 'DESC')
            .getOne();

        return lastHourlyAnalitics ? callIds.filter((c) => !lastHourlyAnalitics.callIds.includes(c)) : callIds;
    }

    private async addHourlyAnalitic(uniqueCallIds: number[], analiticsData: HourlyAnalicsData, reportDate: string, reportHour: number) {
        const report = this.hourlyAnaliticsRepository.create({
            reportDate: reportDate,
            reportHour: reportHour,
            callIds: uniqueCallIds,
            data: analiticsData,
        });

        await this.hourlyAnaliticsRepository.save(report);

        await this.addDailyAnalitic(reportDate, analiticsData);
    }

    private async addDailyAnalitic(reportDate: string, analiticsData: HourlyAnalicsData) {
        const existingAnalitic = await this.dailyAnaliticsRepository.findOne({ where: { reportDate } });
        const dailyStats = existingAnalitic ? existingAnalitic.data : (_.cloneDeep(DAILY_CALL_ANALITICS_DEFAULT_STR) as DailyAnalicsData);

        this.updateLocalTotals(dailyStats.local, analiticsData.local);
        this.updateTotals(dailyStats.incoming, analiticsData.incoming);
        this.updateTotals(dailyStats.outgoing, analiticsData.outgoing);

        this.updateLocations(dailyStats.incoming.cities, analiticsData.incoming.cities);
        this.updateLocations(dailyStats.incoming.regions, analiticsData.incoming.regions);
        this.updateLocations(dailyStats.outgoing.cities, analiticsData.outgoing.cities);
        this.updateLocations(dailyStats.outgoing.regions, analiticsData.outgoing.regions);

        if (!existingAnalitic) {
            const dailyAnalitics = this.dailyAnaliticsRepository.create({
                reportDate,
                data: dailyStats,
            });
            await this.dailyAnaliticsRepository.save(dailyAnalitics);
        } else {
            await this.dailyAnaliticsRepository.update({ id: existingAnalitic.id }, { data: dailyStats });
        }
    }

    private updateLocalTotals(target: any, source: any) {
        target.totalCalls += source.totalCalls;
    }

    private updateTotals(target: any, source: any) {
        target.totalCalls += source.totalCalls;
        target.totalDuration += source.totalDuration;
        target.totalRingingDuration += source.totalRingingDuration;
        target.totalAnsweredCalls += source.totalAnsweredCalls;
        target.totalUnansweredCalls += source.totalUnansweredCalls;
    }

    private updateLocations(target: Record<string, number>, source: Record<string, number>) {
        for (const key in source) {
            target[key] = (target[key] || 0) + source[key];
        }
    }

    private async getUniqueCallIdsForLastHour(startDateTime: Date, endDateTime: Date): Promise<number[]> {
        const result = await this.pbxCallStatisticsRepository
            .createQueryBuilder('pbx_call_statistics')
            .select('DISTINCT pbx_call_statistics.call_id', 'call_id')
            .where('pbx_call_statistics.start_time BETWEEN :startDateTime AND :endDateTime', { startDateTime, endDateTime })
            .getRawMany();

        return result.map((row) => row.call_id);
    }

    private async getStatisticsByCallIds(callIds: number[]): Promise<PbxCallStatistics[]> {
        return this.pbxCallStatisticsRepository.find({
            where: { callId: In(callIds) },
        });
    }

    private generateAnalytics(callData: PbxCallStatistics[]): HourlyAnalicsData {
        const filteredCalls = this.filterCallsBySegment(this.aggregateCallDurations(callData));

        const hourlyStats = _.cloneDeep(HOURLY_CALL_ANALITICS_DEFAULT_STR) as HourlyAnalicsData;

        for (const call of filteredCalls) {
            switch (call.callDirection) {
                case CallDirection.local:
                    this.processLocalCall(hourlyStats.local, call);
                    break;

                case CallDirection.incoming:
                case CallDirection.outgoing:
                    this.processIncomingOrOutgoingCall(hourlyStats[call.callDirection], call);
                    break;
            }
        }

        return hourlyStats as HourlyAnalicsData;
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
        this.incrementCityAndRegionCounts(callData, call);
        this.trackCallById(callData, call);
    }

    private incrementCityAndRegionCounts(callData: any, call: any) {
        if (call.city) {
            callData.cities[call.city] = (callData.cities[call.city] || 0) + 1;
        }
        if (call.region) {
            callData.regions[call.region] = (callData.regions[call.region] || 0) + 1;
        }
    }

    private trackCallById(callData: any, call: any) {
        if (!callData.callsById) callData.callsById = {};
        if (!callData.callsById[call.callId]) {
            callData.callsById[call.callId] = {
                answered: call.answered,
                talkingDuration: call.totalTalkingDuration,
                ringingDuration: call.totalRingingDuration,
            };
        }
    }

    private convertDurationToSeconds(duration: string): number {
        const [hours, minutes, seconds] = duration.split(':').map(parseFloat);
        return Math.trunc(hours * 3600 + minutes * 60 + seconds);
    }

    private aggregateCallDurations(callData: PbxCallStatistics[]): Array<any> {
        const callDurations = new Map<number, any>();

        for (const call of callData) {
            const { callId, talkingDuration, ringingDuration, segmentId } = call;

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
        const uniqueCalls = new Map<number, any>();

        for (const call of callData) {
            const { callId, segmentId } = call;
            if (!uniqueCalls.has(callId) || segmentId < uniqueCalls.get(callId).segmentId) {
                uniqueCalls.set(callId, call);
            }
        }

        return Array.from(uniqueCalls.values());
    }

    private getHourlyIntervalsForWeek(): { startDateTime: Date; endDateTime: Date }[] {
        const intervals = [];

        // Устанавливаем точку начала недели, ровно за 7 дней от текущего времени и округляем до начала часа
        let startOfWeek = startOfHour(subDays(new Date(), 7));

        for (let i = 0; i < 7 * 24; i++) {
            // 7 дней * 24 часа = 168 интервалов
            const endDateTime = addHours(startOfWeek, 1); // Конец текущего часового интервала
            intervals.push({ startDateTime: startOfWeek, endDateTime });
            startOfWeek = endDateTime; // Переход к следующему интервалу
        }

        return intervals;
    }
}
