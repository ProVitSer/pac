import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { QueueSenderBaseService } from './amqp-sender-base.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Exchange, Queues, RoutingKey } from '../../../common/constants/amqp';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AmqpService extends QueueSenderBaseService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        super();

        this.amqpConnection.managedChannel.on('connect', async () => {
            const { channel } = this.amqpConnection;

            for (const [, value] of Object.entries(Exchange)) {
                await channel.assertExchange(value, 'x-delayed-message', {
                    arguments: {
                        'x-delayed-type': 'direct',
                    },
                    durable: true,
                });
            }

            for (const [, value] of Object.entries(Queues)) {
                await channel.assertQueue(value, { durable: true });
            }
            await channel.bindQueue(Queues.events, Exchange.events, RoutingKey.mail);
            await channel.bindQueue(Queues.pbxCqaQueue, Exchange.events, RoutingKey.pbxCqa);

            this.logger.log('AMQP initialization successfully');
        });
    }

    public override async sendMessage(exchange: Exchange, routingKey: RoutingKey, message: { [key: string]: any }) {
        await this.amqpConnection.publish(exchange, routingKey, message, { persistent: true });
    }

    public override async sendMessageWithDelay(exchange: Exchange, routingKey: RoutingKey, message: { [key: string]: any }, delay: number) {
        await this.amqpConnection.publish(exchange, routingKey, message, {
            headers: {
                'x-delay': delay,
            },
            persistent: true,
        });
    }

    public async sendMessageWithId(messageId: string, exchange: Exchange, routingKey: RoutingKey, message: { [key: string]: any }) {
        await this.amqpConnection.publish(exchange, routingKey, message, { messageId });
    }
}
