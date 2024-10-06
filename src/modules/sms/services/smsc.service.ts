import { Injectable } from '@nestjs/common';
import { SmscApiService } from './smsc-api.service';
import { CheckAuthorisationData, CheckConnectionSmsResult, CheckStatusSendingSms, SendSmsData } from '../interfaces/sms.interface';
import { SmscSendSmsDataAdapter } from '../adapters/smsc-send-sms-data.adapter';
import { SmscSendSmsResultAdapter } from '../adapters/smsc-send-sms-result.adapter';
import { SmscCheckStatusDataAdapter } from '../adapters/smsc-check-status-data.adapter';
import { SmscCheckStatusResultAdapter } from '../adapters/smsc-check-status-result.adapter';

@Injectable()
export class SmscService {
    constructor(private readonly smscApiService: SmscApiService) {}

    public async smsSending(data: SendSmsData): Promise<SmscSendSmsResultAdapter> {
        console.log(data);
        const sendingData = new SmscSendSmsDataAdapter(data);
        console.log(sendingData);

        const result = await this.smscApiService.sendSms(sendingData.requestData);

        return new SmscSendSmsResultAdapter(sendingData, result);
    }

    public async checkStatusSendingSms(data: CheckStatusSendingSms): Promise<SmscCheckStatusResultAdapter> {
        const result = await this.smscApiService.checkSmsStatus(new SmscCheckStatusDataAdapter(data).requestParams);

        return new SmscCheckStatusResultAdapter(data, result);
    }

    public async checkAuthorisation(data: CheckAuthorisationData): Promise<CheckConnectionSmsResult> {
        const result = await this.smscApiService.checkBalance({ login: data.login, psw: data.psw });

        return { result: !!result?.balance };
    }
}
