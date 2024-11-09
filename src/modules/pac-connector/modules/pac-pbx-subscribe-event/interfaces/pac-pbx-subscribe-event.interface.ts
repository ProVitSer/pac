import { ApiConnectionCallStatus } from '@app/modules/api/modules/call/interfaces/api-call.enum';

export interface PbxEvenetActiveConnectionsInfo {
    ActiveConnectionsInfo?: PbxEvenetActiveCallsInfoData[];
}

export interface PbxEvenetActiveCallsInfoData {
    CallId: number;
    ConnectionsData: PbxEventActiveConnectionsInfo[];
}

export interface PbxEventActiveConnectionsInfo {
    Id: number;
    CallConnectionId: number;
    ExternalParty: string;
    RecordingState: string;
    PartyConnectionId: number;
    ReferredBy: number;
    IsOutbound: boolean;
    IsInbound: boolean;
    DialedNumber: string;
    InternalParty: string;
    InternalPartyNumber: string;
    ConnectionCallStatus: ApiConnectionCallStatus;
    DestinationNumber: string;
}
