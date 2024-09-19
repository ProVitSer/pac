import { Injectable } from '@nestjs/common';
import { Exchange, Queues, RoutingKey } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CallQualityAssessmentAddCallService } from '../services/call-quality-assessment-add-call.service';
import { EndCallSubHandlerData } from '../interfaces/call-quality-assessment.interface';

@Injectable()
export class CqaEndCallListenters {
    constructor(private readonly cqaAddCall: CallQualityAssessmentAddCallService) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.pbxCqaQueue,
        routingKey: RoutingKey.pbxCqa,
    })
    public async endCallSubHandler(msg: EndCallSubHandlerData): Promise<void | Nack> {
        try {
            await this.cqaAddCall.addCqaCallToStatistic(msg);
        } catch (e) {
            return;
        }
    }
}
