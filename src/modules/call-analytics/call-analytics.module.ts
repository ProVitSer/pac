import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallAnalytics } from './entities/call-analytics.entity';
import { CallAnaliticsListenters } from './listenters/call-analytics.listenters';
import { DadataApiModule } from '../dadata-api/dadata-api.module';
import { CallAnaliticsService } from './services/call-analitics.service';

@Module({
    imports: [TypeOrmModule.forFeature([CallAnalytics]), DadataApiModule],
    providers: [CallAnaliticsListenters, CallAnaliticsService],
})
export class CallAnalyticsModule {}
