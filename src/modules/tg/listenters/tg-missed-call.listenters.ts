import { Injectable } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { TgMissedCallService } from '../services/tg-missed-call.service';

@Injectable()
export class TgMissedCallListenters {
    constructor(private readonly tgMissedCallService: TgMissedCallService) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callMissedTg,
    })
    public async tgMissedCallSubHandler(msg: MissedCallSubHandlerData): Promise<void | Nack> {
        try {
            return await this.tgMissedCallService.sendMissedCallMessage(msg.clientId, msg.externalNumber);
        } catch (e) {
            return;
        }
    }
}
