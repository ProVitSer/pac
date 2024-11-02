import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallAnalytics } from '../entities/call-analytics.entity';
import { ExtensionAnalitics } from '../entities/extension-analytics.entity';
import { PbxCallStatistics } from '../entities/pbx-call-statistics.entity';
@Injectable()
export class CallAnaliticsService {
    constructor(
        @InjectRepository(CallAnalytics)
        private callAnalyticsHandlerRepository: Repository<CallAnalytics>,
        @InjectRepository(PbxCallStatistics)
        private pbxCallStatisticsRepository: Repository<PbxCallStatistics>,
        @InjectRepository(ExtensionAnalitics)
        private extensionAnaliticsRepository: Repository<ExtensionAnalitics>,
    ) {}

    public async addCall(data: Partial<CallAnalytics>): Promise<void> {
        const ca = this.callAnalyticsHandlerRepository.create(data);
        await this.callAnalyticsHandlerRepository.save(ca);
    }

    public async getPbxExtensionStatistics() {}

    private getTopRecords(transformedData: ExtensionAnalitics[]) {
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
