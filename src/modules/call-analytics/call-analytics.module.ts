import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CallAnalytics } from './entities/call-analytics.entity';
import { CallAnaliticsListenters } from './listenters/call-analytics.listenters';
import { DadataApiModule } from '../dadata-api/dadata-api.module';
import { CallAnaliticsService } from './services/call-analitics.service';
import { CallAnaliticsController } from './controllers/call-analytics.controller';
import { PacSqlModule } from '../pac-connector/modules/pac-sql/pac-sql.module';
import { SyncExtensionAnaliticSchedule } from './schedules/sync-extension-analitic.schedule';
import { ExtensionAnalitics } from './entities/extension-analytics.entity';
import { LicensesModule } from '../licenses/licenses.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PbxCallStatistics } from './entities/pbx-call-statistics.entity';
import { SyncPbxCallStatisticsSchedule } from './schedules/sync-pbx-call-statistics.schedule';
import { SyncAnaliticsSchedule } from './schedules/sync-analytics.schedule';
import { HourlyAnalitics } from './entities/hourly-analytics.entity';
import { DailyAnalitics } from './entities/daily-analytics.entity';
import { CallCdrService } from './services/call-cdr.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([HourlyAnalitics, CallAnalytics, ExtensionAnalitics, PbxCallStatistics, DailyAnalitics]),
        DadataApiModule,
        PacSqlModule,
        LicensesModule,
        ScheduleModule.forRoot(),
    ],
    providers: [
        CallAnaliticsListenters,
        CallAnaliticsService,
        SyncExtensionAnaliticSchedule,
        SyncPbxCallStatisticsSchedule,
        SyncAnaliticsSchedule,
        CallCdrService,
    ],
    controllers: [CallAnaliticsController],
})
export class CallAnalyticsModule {}
