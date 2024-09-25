import { Module } from '@nestjs/common';
import { PacConnectorModule } from '../../pac-connector.module';
import { PacPbxSubscribeEventService } from './services/pac-pbx-subscribe-event.service';
import { PacPbxSubscribeEventNotificationService } from './services/pac-pbx-subscribe-event-notification.service';
import { PacSqlModule } from '../pac-sql/pac-sql.module';
import { PacPbxSubscribeEventController } from './controllers/pac-pbx-subscribe-event.controller';
import { ClientModule } from '@app/modules/client/client.module';
import { PacCallModule } from '../pac-call/pac-call.module';
import { AmqpModule } from '@app/modules/amqp/amqp.module';
import { SmartRoutingModule } from '@app/modules/smart-routing/smart-routing.module';

@Module({
    imports: [PacConnectorModule, PacSqlModule, ClientModule, PacCallModule, AmqpModule, SmartRoutingModule],
    providers: [PacPbxSubscribeEventService, PacPbxSubscribeEventNotificationService],
    exports: [PacPbxSubscribeEventService],
    controllers: [PacPbxSubscribeEventController],
})
export class PacPbxSubscribeEventModule {}
