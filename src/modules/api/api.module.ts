import { Module } from '@nestjs/common';
import { PacCallModule } from '../pac-connector/modules/pac-call/pac-call.module';
import { ApiCallController } from './modules/call/controllers/api-call.controller';
import { ApiCallService } from './modules/call/services/api-call.service';
import { ApiExtensionController } from './modules/extension/controllers/api-extension.controller';
import { ApiExtensionService } from './modules/extension/services/api-extension.service';
import { PacExtensionModule } from '../pac-connector/modules/pac-extension/pac-extension.module';

@Module({
    imports: [PacCallModule, PacExtensionModule],
    controllers: [ApiCallController, ApiExtensionController],
    providers: [ApiCallService, ApiExtensionService],
})
export class ApiModule {}
