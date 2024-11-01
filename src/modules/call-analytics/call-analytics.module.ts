import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallAnalytics } from './entities/call-analytics.entity';
import { CallAnaliticsListenters } from './listenters/call-analytics.listenters';
import { DadataApiModule } from '../dadata-api/dadata-api.module';
import { CallAnaliticsService } from './services/call-analitics.service';
import { CallAnaliticsController } from './controllers/call-analytics.controller';
import { PacSqlModule } from '../pac-connector/modules/pac-sql/pac-sql.module';

@Module({
    imports: [TypeOrmModule.forFeature([CallAnalytics]), DadataApiModule, PacSqlModule],
    providers: [CallAnaliticsListenters, CallAnaliticsService],
    controllers: [CallAnaliticsController],
})
export class CallAnalyticsModule {}
