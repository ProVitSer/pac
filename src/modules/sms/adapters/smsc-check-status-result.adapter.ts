import { SmsSendStatus } from '../interfaces/sms.enum';
import { CheckStatusSendingSms, SmscCheckSmsStatusResponse } from '../interfaces/sms.interface';
import { SMSC_ERROR_CODE_DESCRIPTION, SMSC_STATUS_DESCRIPTION, SMSC_STATUS_TO_SMS_STATUS } from '../sms.constants';

export class SmscCheckStatusResultAdapter {
    public smsId: string;
    public smsSendStatus: SmsSendStatus;
    public smsSendResult: string;

    constructor(
        private data: CheckStatusSendingSms,
        private checkSmsStatusResponse: SmscCheckSmsStatusResponse,
    ) {
        const resultStatusInfo = 'error_code' in this.checkSmsStatusResponse ? this.formatError() : this.getResultStatus();
        this.smsId = data.smsId;
        this.smsSendStatus = resultStatusInfo.smsSendStatus;
        this.smsSendResult = resultStatusInfo.smsSendResult;
    }

    private formatError() {
        return {
            smsSendStatus: SmsSendStatus.apiFail,
            smsSendResult: SMSC_ERROR_CODE_DESCRIPTION[this.checkSmsStatusResponse.error_code],
        };
    }

    private getResultStatus() {
        return {
            smsSendStatus: SMSC_STATUS_TO_SMS_STATUS[this.checkSmsStatusResponse.status],
            smsSendResult: SMSC_STATUS_DESCRIPTION[this.checkSmsStatusResponse.status],
        };
    }
}
