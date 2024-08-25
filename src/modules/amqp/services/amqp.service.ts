import { Inject, Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { QueueSenderBaseService } from './amqp-sender-base.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Exchange, Queues, RoutingKey } from '@app/common/constants/amqp';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AmqpService extends QueueSenderBaseService implements OnModuleInit {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        super();
    }

    async onModuleInit() {
        this.amqpConnection.managedChannel.on('connect', async () => {
            const { channel } = this.amqpConnection;

            for (const [, value] of Object.entries(Exchange)) {
                await channel.assertExchange(value, 'topic', { durable: true });
            }

            for (const [, value] of Object.entries(Queues)) {
                await channel.assertQueue(value, { durable: true });
            }
            await channel.bindQueue(Queues.events, Exchange.events, RoutingKey.mail);

            this.logger.log('AMQP initialization successfully');
        });
    }

    public override async sendMessage(exchange: Exchange, routingKey: RoutingKey, message: { [key: string]: any }) {
        console.log(message);
        await this.amqpConnection.publish(exchange, routingKey, message);
    }

    public async sendMessageWithId(messageId: string, exchange: Exchange, routingKey: RoutingKey, message: { [key: string]: any }) {
        await this.amqpConnection.publish(exchange, routingKey, message, { messageId });
    }
}
