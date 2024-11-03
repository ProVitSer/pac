import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CallAnalytics } from '../entities/call-analytics.entity';
import { ExtensionAnalitics } from '../entities/extension-analytics.entity';
import { DailyAnalitics } from '../entities/daily-analytics.entity';
import { HourlyAnalitics } from '../entities/hourly-analytics.entity';
import { CallAnanliticsData } from '../interfaces/call-analytics.interface';
import { format, subDays } from 'date-fns';
@Injectable()
export class CallAnaliticsService {
    constructor(
        @InjectRepository(CallAnalytics)
        private callAnalyticsHandlerRepository: Repository<CallAnalytics>,
        @InjectRepository(ExtensionAnalitics)
        private extensionAnaliticsRepository: Repository<ExtensionAnalitics>,
        @InjectRepository(HourlyAnalitics)
        private hourlyAnaliticsRepository: Repository<HourlyAnalitics>,
        @InjectRepository(DailyAnalitics)
        private dailyAnaliticsRepository: Repository<DailyAnalitics>,
    ) {}

    public async addCall(data: Partial<CallAnalytics>): Promise<void> {
        const ca = this.callAnalyticsHandlerRepository.create(data);
        await this.callAnalyticsHandlerRepository.save(ca);
    }

    public async getAnaliticsData(): Promise<CallAnanliticsData> {
        return {
            extensionDaliyStatistic: await this.getTopExtensionRecords(),
            ...(await this.getDailyAnalitic()),
            lastSevenDaysCalls: await this.getTotalWeeklyCalls(),
            dayCallScheduleByHour: { ...(await this.getDayCallScheduleByHour()) },
        };
    }

    private async getTopExtensionRecords() {
        const extensionAnalitics = await this.extensionAnaliticsRepository.find();

        return this._getTopExtensionRecords(extensionAnalitics);
    }

    private async getDayCallScheduleByHour() {
        const reportDate = format(new Date(), 'yyyy-MM-dd');

        const hourlyAnalitic = await this.hourlyAnaliticsRepository
            .createQueryBuilder('hourly_analitics')
            .where(`hourly_analitics.report_date = '${reportDate}'`)
            .orderBy('hourly_analitics.report_hour', 'DESC')
            .getMany();

        return {
            answered: hourlyAnalitic.map((h) => h.data.incoming.totalAnsweredCalls),
            unanswered: hourlyAnalitic.map((h) => h.data.incoming.totalUnansweredCalls),
        };
    }

    private async getTotalWeeklyCalls() {
        const endDate = new Date();
        const startDate = subDays(endDate, 6);

        const formattedEndDate = format(endDate, 'yyyy-MM-dd');
        const formattedStartDate = format(startDate, 'yyyy-MM-dd');

        const dailyReports = await this.dailyAnaliticsRepository.find({
            where: { reportDate: Between(formattedStartDate, formattedEndDate) },
        });

        const lastSevenDaysCalls: Record<string, { answered: number; unanswered: number }>[] = dailyReports.map((report) => {
            const formattedDate = format(new Date(report.reportDate), 'dd.MM');
            return {
                [formattedDate]: {
                    answered: report.data.incoming.totalAnsweredCalls,
                    unanswered: report.data.incoming.totalUnansweredCalls,
                },
            };
        });

        return lastSevenDaysCalls;
    }

    private async getDailyAnalitic() {
        const reportDate = format(new Date(), 'yyyy-MM-dd');

        const dayAnalitic = await this.dailyAnaliticsRepository.findOne({
            where: {
                reportDate,
            },
        });

        return {
            totalDailyCalls: dayAnalitic.data.incoming.totalCalls + dayAnalitic.data.outgoing.totalCalls,
            totalDailyAnsweredCalls: dayAnalitic.data.incoming.totalAnsweredCalls + dayAnalitic.data.outgoing.totalAnsweredCalls,
            totalDailyUnansweredCalls: dayAnalitic.data.incoming.totalUnansweredCalls + dayAnalitic.data.outgoing.totalUnansweredCalls,
            averageDailyTalkTime: this.formatDuration(dayAnalitic.data.incoming.totalDuration / 2),
            dayRegionCall: Object.entries(dayAnalitic.data.incoming.regions).map(([name, value]) => ({ name, value })),
        };
    }

    private _getTopExtensionRecords(transformedData: ExtensionAnalitics[]) {
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
}
