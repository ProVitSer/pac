import { Module } from '@nestjs/common';
import { PacCallModule } from '../pac-connector/modules/pac-call/pac-call.module';
import { ApiCallController } from './modules/call/controllers/api-call.controller';
import { ApiCallService } from './modules/call/services/api-call.service';

@Module({
    imports: [PacCallModule],
    controllers: [ApiCallController],
    providers: [ApiCallService],
})
export class ApiModule {}
