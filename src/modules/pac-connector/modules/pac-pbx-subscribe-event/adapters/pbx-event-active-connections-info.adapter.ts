import { ApiActiveConnectionsInfo } from '@app/modules/api/modules/call/interfaces/api-call.interface';
import {
    PbxEvenetActiveCallsInfoData,
    PbxEvenetActiveConnectionsInfo,
    PbxEventActiveConnectionsInfo,
} from '../interfaces/pac-pbx-subscribe-event.interface';
import { ApiConnectionCallStatus } from '@app/modules/api/modules/call/interfaces/api-call.enum';
import { CONNECTION_CALL_STATUS_TO_API_CALL_STATUS } from '@app/modules/api/modules/call/api-call.constants';

export class PbxEventActiveConnectionsInfoAdapter {
    public activeConnectionsInfo: ApiActiveConnectionsInfo[] = [];
    constructor(data: PbxEvenetActiveConnectionsInfo) {
        data.ActiveConnectionsInfo.map((a: PbxEvenetActiveCallsInfoData) => {
            this.activeConnectionsInfo.push({
                callId: a.CallId,
                connectionsData: a.ConnectionsData.map((c: PbxEventActiveConnectionsInfo) => {
                    return {
                        id: c.Id,
                        callConnectionId: c.CallConnectionId,
                        externalParty: c.ExternalParty,
                        recordingState: c.RecordingState,
                        partyConnectionId: c.PartyConnectionId,
                        referredBy: c.ReferredBy,
                        isOutbound: c.IsInbound,
                        isInbound: c.IsOutbound,
                        dialedNumber: c.DialedNumber,
                        internalParty: c.InternalParty,
                        internalPartyNumber: c.InternalPartyNumber,
                        connectionCallStatus: c?.ConnectionCallStatus
                            ? CONNECTION_CALL_STATUS_TO_API_CALL_STATUS[c?.ConnectionCallStatus]
                            : ApiConnectionCallStatus.CallUndefined,
                        destinationNumber: c.DestinationNumber,
                    };
                }),
            });
        });
    }
}
