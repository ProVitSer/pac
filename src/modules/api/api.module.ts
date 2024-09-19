import { Module } from '@nestjs/common';
import { PacCallModule } from '../pac-connector/modules/pac-call/pac-call.module';
import { ApiCallController } from './modules/call/controllers/api-call.controller';
import { ApiCallService } from './modules/call/services/api-call.service';
import { ApiExtensionController } from './modules/extension/controllers/api-extension.controller';
import { ApiExtensionService } from './modules/extension/services/api-extension.service';
import { PacExtensionModule } from '../pac-connector/modules/pac-extension/pac-extension.module';
import { ApiQueueService } from './modules/queue/services/api-queue.service';
import { ApiQueueController } from './modules/queue/controllers/api-queue.controller';
import { PacQueueModule } from '../pac-connector/modules/pac-queue/pac-queue.module';
import { ApiRingGroupController } from './modules/ring-group/controllers/api-ring-group.controller';
import { ApiRingGroupService } from './modules/ring-group/services/api-ring-group.service';
import { PacRingGroupModule } from '../pac-connector/modules/pac-ring-group/pac-ring-group.module';
import { PacContactModule } from '../pac-connector/modules/pac-contact/pac-contact.module';
import { ApiContactController } from './modules/contact/controllers/api-contact.controller';
import { ApiContactService } from './modules/contact/services/api-contact.service';
import { AuthModule } from '../auth/auth.module';
import { AuthController } from './controller/api-controller';

@Module({
    imports: [PacCallModule, PacExtensionModule, PacQueueModule, PacRingGroupModule, PacContactModule, AuthModule],
    controllers: [
        ApiCallController,
        ApiExtensionController,
        ApiQueueController,
        ApiRingGroupController,
        ApiContactController,
        AuthController,
    ],
    providers: [ApiCallService, ApiExtensionService, ApiQueueService, ApiRingGroupService, ApiContactService],
})
export class ApiModule {}
