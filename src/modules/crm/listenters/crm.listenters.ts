import { Injectable } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { CallAnaliticsData } from '@app/modules/call-analytics/interfaces/call-analytics.interface';
import { CrmService } from '../services/crm.service';

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
    public async addCallSubHandler(msg: CallAnaliticsData): Promise<void | Nack> {
        return await this.crmService.addCallToCrm(msg);
    }
}
