import { Injectable } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CallOnProcessEvent } from '../interfaces/call-event-handler.interface';
import { CallEventHandlerService } from '../services/call-event-handler.service';

@Injectable()
export class СallEventHandlerListenters {
    constructor(private readonly callEventHandlerService: CallEventHandlerService) {}

    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callRinging,
    })
    public async callRingingSubHandler(msg: CallOnProcessEvent): Promise<void | Nack> {
        await this.callEventHandlerService.handleCall(msg);
    }
}
