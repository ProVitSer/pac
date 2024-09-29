import { Injectable } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { TgService } from '../services/tg.service';

@Injectable()
export class TgMissedCallListenters {
    constructor(private readonly tgService: TgService) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callMissedTg,
    })
    public async tgMissedCallSubHandler(msg: MissedCallSubHandlerData): Promise<void | Nack> {
        try {
            return await this.tgService.sendMissedCallMessage(msg.clientId, msg.externalNumber);
        } catch (e) {
            return;
        }
    }
}
