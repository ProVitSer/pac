import { GetActiveCallsInfoData, GetActiveCallsInfoReply } from '@app/modules/pac-connector/modules/pac-call/interfaces/pac-call.interface';
import { ActiveCallsInfo } from '../interfaces/api-call.interface';
import { CALL_DIRECTION_TO_API_CALL_DIRECTION, CALL_STATUS_TO_API_CALL_STATUS } from '../api-call.constants';

export class ActiveCallsInfoResultAdapter {
    public activeCallsInfo: ActiveCallsInfo[];
    constructor(private getActiveCallsInfoReply: GetActiveCallsInfoReply) {
        this.activeCallsInfo = getActiveCallsInfoReply.activeCallsInfoData.map((a: GetActiveCallsInfoData) => {
            return {
                callId: a.callId,
                callDirection: CALL_DIRECTION_TO_API_CALL_DIRECTION[a.callDirection],
                status: CALL_STATUS_TO_API_CALL_STATUS[a.status],
                localNumber: a.localNumber,
                remoteNumber: a.remoteNumber,
            };
        });
    }
}
