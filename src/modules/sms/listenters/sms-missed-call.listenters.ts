import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { SmsService } from '../services/sms.service';
import { UtilsService } from '@app/common/utils/utils.service';
import { DEFAULTMISSED_CALL_SMS_TEXT } from '../sms.constants';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SmsMissedCallListenters {
    constructor(
        private readonly smsService: SmsService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callMissedSms,
    })
    public async smsMissedCallSubHandler(msg: MissedCallSubHandlerData): Promise<void | Nack> {
        try {
            return await this.sendSms(msg);
        } catch (e) {
            this.logger.error(e);
            return;
        }
    }

    private async sendSms(msg: MissedCallSubHandlerData): Promise<void> {
        const formatNumber = UtilsService.formatNumber(msg.externalNumber);

        await this.smsService.sendSms({
            clientId: msg.clientId,
            externalNumber: formatNumber,
            smsText: DEFAULTMISSED_CALL_SMS_TEXT,
        });
    }
}
