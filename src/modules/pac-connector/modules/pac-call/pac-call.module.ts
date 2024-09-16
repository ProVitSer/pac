import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacCallService } from './services/pac-call.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacCallService],
    exports: [PacCallService],
})
export class PacCallModule {}
