import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { QueueSenderBaseService } from './amqp-sender-base.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Exchange, Queues, RoutingKey } from '../../../common/constants/amqp';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { Contexts, SendMailData } from '@app/modules/mail/interfaces/mail.interface';
import { EndCallSubHandlerData } from '@app/modules/call-quality-assessment/interfaces/call-quality-assessment.interface';
import { CallOnProcessEvent } from '@app/modules/call-event-handler/interfaces/call-event-handler.interface';
import { CallAnaliticsData } from '@app/modules/call-analytics/interfaces/call-analytics.interface';
import { CrmCallData } from '@app/modules/crm/interfaces/crm.interface';

@Injectable()
export class AmqpService extends QueueSenderBaseService {
    constructor(
        private readonly amqpConnection: AmqpConnection,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        super();

        try {
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
                await channel.bindQueue(Queues.mail, Exchange.events, RoutingKey.sendMail);
                await channel.bindQueue(Queues.pbxCqaQueue, Exchange.events, RoutingKey.pbxCqa);
                await channel.bindQueue(Queues.callRinging, Exchange.events, RoutingKey.callRinging);
                await channel.bindQueue(Queues.callConnected, Exchange.events, RoutingKey.callConnected);
                await channel.bindQueue(Queues.callEnd, Exchange.events, RoutingKey.callEnd);
                await channel.bindQueue(Queues.callMissed, Exchange.events, RoutingKey.callMissed);
                await channel.bindQueue(Queues.callMissedCrm, Exchange.events, RoutingKey.callMissedCrm);
                await channel.bindQueue(Queues.callMissedSms, Exchange.events, RoutingKey.callMissedSms);
                await channel.bindQueue(Queues.callMissedTg, Exchange.events, RoutingKey.callMissedTg);
                await channel.bindQueue(Queues.callAnalitics, Exchange.events, RoutingKey.incomingCallAnalitics);
                await channel.bindQueue(Queues.callAnalitics, Exchange.events, RoutingKey.outboundCallAnalitics);
                await channel.bindQueue(Queues.callAnalitics, Exchange.events, RoutingKey.localCallAnalitics);
                await channel.bindQueue(Queues.addCallCrm, Exchange.events, RoutingKey.addCallToCrm);

                this.logger.log('AMQP initialization successfully');
            });
        } catch (e) {
            this.logger.error(e);
            process.exit(1);
        }
    }

    public async sendMessage(exchange: Exchange, routingKey: RoutingKey.addCallToCrm, message: CrmCallData): Promise<void>;
    public async sendMessage(exchange: Exchange, routingKey: RoutingKey.pbxCqa, message: EndCallSubHandlerData): Promise<void>;
    public async sendMessage(
        exchange: Exchange,
        routingKey: RoutingKey.callMissed | RoutingKey.callMissedTg | RoutingKey.callMissedSms | RoutingKey.callMissedCrm,
        message: MissedCallSubHandlerData,
    ): Promise<void>;
    public async sendMessage(exchange: Exchange, routingKey: RoutingKey.sendMail, message: SendMailData<Contexts>): Promise<void>;
    public async sendMessage(exchange: Exchange, routingKey: RoutingKey.callRinging, message: CallOnProcessEvent): Promise<void>;
    public async sendMessage(
        exchange: Exchange,
        routingKey: RoutingKey.incomingCallAnalitics | RoutingKey.outboundCallAnalitics | RoutingKey.localCallAnalitics,
        message: CallAnaliticsData,
    ): Promise<void>;
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
