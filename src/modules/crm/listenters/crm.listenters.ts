import { Injectable } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { CrmService } from '../services/crm.service';
import { CrmCallData } from '../interfaces/crm.interface';

@Injectable()
export class CrmListenters {
    constructor(private readonly crmService: CrmService) {}

    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callMissedCrm,
    })
    public async crmMissedCallSubHandler(msg: MissedCallSubHandlerData): Promise<void | Nack> {
        return await this.crmService.addMissedCallToCrm(msg);
    }

    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.addCallCrm,
    })
    public async addCallSubHandler(msg: CrmCallData): Promise<void | Nack> {
        return await this.crmService.addCallToCrm(msg);
    }
}
