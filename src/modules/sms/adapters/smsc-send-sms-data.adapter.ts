import { v1 } from 'uuid';
import { ResponseFormat } from '../interfaces/sms.enum';
import { SendSmsData, SmscSendSmsData } from '../interfaces/sms.interface';

export class SmscSendSmsDataAdapter {
    public requestData: SmscSendSmsData;
    constructor(data: SendSmsData) {
        const sender = data.sender !== 'default' ? { sender: data.sender } : {};
        this.requestData = {
            login: data.login,
            psw: data.psw,
            phones: data.externalNumber,
            mes: data.smsText,
            id: v1(),
            ...sender,
            fmt: ResponseFormat.json,
        };
    }
}
