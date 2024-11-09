import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { CallQualityAssessmentAddCallService } from '../services/call-quality-assessment-add-call.service';
import { EndCallSubHandlerData } from '../interfaces/call-quality-assessment.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CqaEndCallListenters {
    constructor(
        private readonly cqaAddCall: CallQualityAssessmentAddCallService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.pbxCqaQueue,
    })
    public async endCallSubHandler(msg: EndCallSubHandlerData): Promise<void | Nack> {
        try {
            await this.cqaAddCall.addCqaCallToStatistic(msg);
        } catch (e) {
            this.logger.error(e);
            return;
        }
    }
}
