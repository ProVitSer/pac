import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacPbxSubscribeEventService } from './services/pac-pbx-subscribe-event.service';

@Module({
    imports: [PacConnectorModule],
    providers: [PacPbxSubscribeEventService],
    exports: [PacPbxSubscribeEventService],
})
export class PacPbxSubscribeEventModule {}
