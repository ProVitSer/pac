import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallAnalytics } from '../entities/call-analytics.entity';

@Injectable()
export class CallAnaliticsService {
    constructor(
        @InjectRepository(CallAnalytics)
        private callAnalyticsHandlerRepository: Repository<CallAnalytics>,
    ) {}

    public async addCall(data: Partial<CallAnalytics>): Promise<void> {
        const ca = this.callAnalyticsHandlerRepository.create(data);
        await this.callAnalyticsHandlerRepository.save(ca);
    }
}
