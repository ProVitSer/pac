import { Injectable } from '@nestjs/common';
import { Exchange, Queues } from '../../../common/constants/amqp';
import { Nack, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { MissedCallSubHandlerData } from '@app/modules/missed-call/interfaces/missed-call.interface';
import { SmsService } from '../services/sms.service';
import { UtilsService } from '@app/common/utils/utils.service';
import { DEFAULTMISSED_CALL_SMS_TEXT } from '../sms.constants';

@Injectable()
export class SmsMissedCallListenters {
    constructor(private readonly smsService: SmsService) {}
    @RabbitSubscribe({
        exchange: Exchange.events,
        queue: Queues.callMissedSms,
    })
    public async smsMissedCallSubHandler(msg: MissedCallSubHandlerData): Promise<void | Nack> {
        try {
            return await this.sendSms(msg);
        } catch (e) {
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
