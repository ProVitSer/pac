import { Module } from '@nestjs/common';
import { NotificationsService } from './services/notifications.service';
import { AmqpModule } from '../amqp/amqp.module';

@Module({
    imports: [AmqpModule],
    providers: [NotificationsService],
    exports: [NotificationsService],
})
export class NotificationsModule {}
