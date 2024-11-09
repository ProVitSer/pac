import {
    ActiveConnectionsInfo,
    ConnectionsData,
    GetActiveConnectionsInfoReply,
} from '@app/modules/pac-connector/modules/pac-call/interfaces/pac-call.interface';
import { ApiActiveConnectionsInfo } from '../interfaces/api-call.interface';
import { ApiConnectionCallStatus } from '../interfaces/api-call.enum';
import { CONNECTION_CALL_STATUS_TO_API_CALL_STATUS } from '../api-call.constants';

export class ActiveConnectionsInfoAdapter {
    public activeConnectionsInfo: ApiActiveConnectionsInfo[] = [];

    constructor(data: GetActiveConnectionsInfoReply) {
        data.activeConnectionsInfo.map((a: ActiveConnectionsInfo) => {
            this.activeConnectionsInfo.push({
                callId: a.callId,
                connectionsData: a.connectionsData.map((c: ConnectionsData) => {
                    return {
                        id: c.id,
                        callConnectionId: c.callConnectionId,
                        externalParty: c.externalParty,
                        recordingState: c.recordingState,
                        partyConnectionId: c.partyConnectionId,
                        referredBy: c?.referredBy || 0,
                        isOutbound: c.isOutbound || false,
                        isInbound: c.isInbound || false,
                        dialedNumber: c.dialedNumber,
                        internalParty: c.internalParty,
                        internalPartyNumber: c.internalPartyNumber,
                        connectionCallStatus: c?.connectionCallStatus
                            ? CONNECTION_CALL_STATUS_TO_API_CALL_STATUS[c?.connectionCallStatus]
                            : ApiConnectionCallStatus.CallUndefined,
                        destinationNumber: c.destinationNumber,
                    };
                }),
            });
        });
    }
}
