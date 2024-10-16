import { ResponseFormat } from '../interfaces/sms.enum';
import { CheckStatusSendingSms, SmscCheckSmsStatusParams } from '../interfaces/sms.interface';

export class SmscCheckStatusDataAdapter {
    public requestParams: SmscCheckSmsStatusParams;
    constructor(data: CheckStatusSendingSms) {
        this.requestParams = {
            id: data.smsId,
            login: data.login,
            psw: data.psw,
            phone: data.phones,
            fmt: ResponseFormat.json,
        };
    }
}
