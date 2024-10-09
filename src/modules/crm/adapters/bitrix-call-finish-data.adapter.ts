import { BitrixAttachRecord, BitrixExternalCallFinishRequest, RegisterCallInfo } from '../interfaces/crm.interface';

export class BitrixCallFinishDataAdapter {
    public readonly finishData: BitrixExternalCallFinishRequest;
    public readonly attachRecordData: BitrixAttachRecord;

    constructor(callId: string, crmUserId: string, callInfo: RegisterCallInfo) {
        this.finishData = {
            CALL_ID: callId,
            USER_ID: crmUserId,
            DURATION: Number(callInfo.billsec),
            STATUS_CODE: callInfo.bitrixCallStatusType,
            TYPE: callInfo.calltype,
        };

        this.attachRecordData = {
            CALL_ID: callId,
            FILENAME: callInfo.recording.split('/').pop(),
            RECORD_URL: callInfo.recording,
        };
    }
}
