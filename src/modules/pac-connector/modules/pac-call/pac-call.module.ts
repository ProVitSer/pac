import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacCallService } from './services/pac-call.service';
import { PacCallController } from './controllers/pac-call.controller';

@Module({
    imports: [PacConnectorModule],
    providers: [PacCallService],
    controllers: [PacCallController],
    exports: [PacCallService],
})
export class PacCallModule {}
