import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtensionAnalitics } from '../entities/extension-analytics.entity';
import { format, startOfDay, endOfDay } from 'date-fns';
import { getExtensionStatisticsQuery } from '@app/common/constants/sql';
import { LicensesService } from '@app/modules/licenses/services/licenses.service';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { PbxExtensionsStatisticsData, TransformedPbxExtensionsStatisticsData } from '../interfaces/call-analytics.interface';

@Injectable()
export class SyncExtensionAnaliticSchedule {
    constructor(
        @InjectRepository(ExtensionAnalitics)
        private extensionAnaliticsRepository: Repository<ExtensionAnalitics>,
        private readonly pacSqlService: PacSqlService,
        private readonly licensesService: LicensesService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async syncExtensionAnalitic() {
        const license = await this.licensesService.getLicenses();

        if (!license.isActive) return;

        if (!license.products.some((p) => (p.productType = ProductType.analitic))) return;

        const extensionStatistics = await this.getExtensionStatistics(license.client.clientId);

        if (!extensionStatistics) return;

        const aggregatedData = this.aggregatePbxExtensionsData(JSON.parse(extensionStatistics));

        for (const data of aggregatedData) {
            await this.addExtensionTopRecords(data);
        }
    }

    private async addExtensionTopRecords(aggregatedData: TransformedPbxExtensionsStatisticsData) {
        await this.extensionAnaliticsRepository.upsert(
            [
                {
                    extension: aggregatedData.extension,
                    displayName: aggregatedData.extension,
                    inboundAnsweredCount: aggregatedData.inboundAnsweredCount,
                    inboundUnansweredCount: aggregatedData.inboundUnansweredCount,
                    outboundCallCount: aggregatedData.outboundCallCount,
                    callTalkingDur: aggregatedData.callTalkingDur,
                },
            ],
            ['extension'],
        );
    }

    private async getExtensionStatistics(clientId: number): Promise<string> {
        const now = new Date();

        const startOfToday = startOfDay(now);

        const endOfToday = endOfDay(now);

        const formattedStart = format(startOfToday, 'yyyy-MM-dd HH:mm:ss+00');

        const formattedEnd = format(endOfToday, 'yyyy-MM-dd HH:mm:ss+00');

        const result = await this.pacSqlService.sqlRequest(clientId, { query: getExtensionStatisticsQuery(formattedStart, formattedEnd) });

        const parseResult = JSON.parse(result.result);

        return parseResult[0][0];
    }

    private aggregatePbxExtensionsData(data: PbxExtensionsStatisticsData[]): TransformedPbxExtensionsStatisticsData[] {
        const aggregatedMap: { [key: string]: TransformedPbxExtensionsStatisticsData } = {};
        console.log(JSON.stringify(data));
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
                this.convertDurationToSeconds(item.inbound_answered_talking_dur_ || '00:00:00') +
                this.convertDurationToSeconds(item.outbound_answered_talking_dur_ || '00:00:00');
        });

        return Object.values(aggregatedMap);
    }

    private convertDurationToSeconds(duration: string): number {
        const [hours, minutes, seconds] = duration.split(':').map(parseFloat);
        return Math.trunc(hours * 3600 + minutes * 60 + seconds);
    }
}
