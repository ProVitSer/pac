import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CrmListenters } from './listenters/crm.listenters';
import { CrmSyncUsersSchedule } from './schedules/crm-sync-users.schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrmConfig } from './entities/crm-config.entity';
import { CrmUsers } from './entities/crm-users.entity';
import { CrmApiService } from './services/crm-api.service';
import { CrmConfigService } from './services/crm-config.service';
import { CrmService } from './services/crm.service';
import { CrmConfigController } from './controllers/crm-config.controller';

@Module({
    imports: [TypeOrmModule.forFeature([CrmConfig, CrmUsers]), HttpModule],
    controllers: [CrmConfigController],
    providers: [CrmListenters, CrmSyncUsersSchedule, CrmService, CrmApiService, CrmConfigService],
    exports: [CrmService, CrmConfigService],
})
export class CrmModule {}
