import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '../interfaces/missed-call.interface';
import { AmqpService } from '@app/modules/amqp/services/amqp.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissedCall } from '../entities/missed-call.entity';
import { MissedServiceType } from '../interfaces/missed-call.enum';
import { MISSQD_CALL_EVENT_KEY } from '../missed-call.constants';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MissedCallListenters {
    constructor(
        @InjectRepository(MissedCall)
        private missedCallRepository: Repository<MissedCall>,
        private readonly amqpService: AmqpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callMissed,
    })
    public async missedCallSubHandler(msg: MissedCallSubHandlerData): Promise<void | Nack> {
        try {
            return await this.missedCallEvent(msg);
        } catch (e) {
            this.logger.error(e);
            return;
        }
    }

    private async missedCallEvent(msg: MissedCallSubHandlerData): Promise<void> {
        const missedCall = await this.missedCallRepository.findOne({
            where: { trunkName: msg.trunkName },
        });

        if (!missedCall) return;

        missedCall.missedServiceType.map((m: MissedServiceType) => {
            this.amqpService.sendMessage(Exchange.events, MISSQD_CALL_EVENT_KEY[m], msg);
        });
    }
}
