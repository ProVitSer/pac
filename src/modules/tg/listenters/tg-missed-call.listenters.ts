import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { TgMissedCallService } from '../services/tg-missed-call.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class TgMissedCallListenters {
    constructor(
        private readonly tgMissedCallService: TgMissedCallService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callMissedTg,
    })
    public async tgMissedCallSubHandler(msg: MissedCallSubHandlerData): Promise<void | Nack> {
        try {
            return await this.tgMissedCallService.sendMissedCallMessage(msg.clientId, msg.externalNumber);
        } catch (e) {
            this.logger.error(e);
            return;
        }
    }
}
