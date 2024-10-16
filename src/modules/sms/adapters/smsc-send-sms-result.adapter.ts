import { SmscStatus, SmsSendStatus } from '../interfaces/sms.enum';
import { SmscSendSmsResponse } from '../interfaces/sms.interface';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION } from '../sms.constants';
import { SmscSendSmsDataAdapter } from './smsc-send-sms-data.adapter';

export class SmscSendSmsResultAdapter {
    public smsSendStatus: SmsSendStatus;
    public smsSendResult: string;
    public smsId: string;
    public number: string;
    public smsText: string;
    public sender: string;

    constructor(
        private data: SmscSendSmsDataAdapter,
        private sendSmsResponse: SmscSendSmsResponse,
    ) {
        const resultStatusInfo = 'error_code' in this.sendSmsResponse ? this.formatError() : this.inProgress();
        this.smsSendStatus = resultStatusInfo.smsSendStatus;
        this.smsSendResult = resultStatusInfo.smsSendResult;
        this.smsId = data.requestData.id;
        this.number = data.requestData.phones;
        this.smsText = data.requestData.mes;
        this.sender = data.requestData.sender;
    }

    private formatError() {
        return {
            smsSendStatus: SmsSendStatus.apiFail,
            smsSendResult: SMSC_ERROR_CODE_DESCRIPTION[this.sendSmsResponse.error_code],
        };
    }

    private inProgress() {
        return {
            smsSendStatus: SmsSendStatus.inProgress,
            smsSendResult: SMSC_STATUS_DESCRIPTION[SmscStatus.WaitingSent],
        };
    }
}
