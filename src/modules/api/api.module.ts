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

@Module({
    imports: [PacCallModule, PacExtensionModule, PacQueueModule],
    controllers: [ApiCallController, ApiExtensionController, ApiQueueController],
    providers: [ApiCallService, ApiExtensionService, ApiQueueService],
})
export class ApiModule {}
