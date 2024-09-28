import { Injectable } from '@nestjs/common';
import { Exchange, Queues, RoutingKey } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CallRingingEvent } from '../interfaces/call-event-handler.interface';
import { CallEventHandlerService } from '../services/call-event-handler.service';

@Injectable()
export class СallEventHandlerListenters {
    constructor(private readonly callEventHandlerService: CallEventHandlerService) {}

    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.calls,
        routingKey: RoutingKey.callRinging,
    })
    public async callRingingSubHandler(msg: CallRingingEvent): Promise<void | Nack> {
        await this.callEventHandlerService.handleRingingCall(msg);
    }
}
