import { ApiActiveCallsStatus, ApiCallDirection, ApiConnectionCallStatus } from './api-call.enum';

export interface ActiveCalls {
    activeCallsInfo: ActiveCallsInfo[];
}

export interface ActiveCallsInfo {
    callId: number;
    callDirection: ApiCallDirection;
    status: ApiActiveCallsStatus;
    localNumber: string;
    remoteNumber: string;
}

export interface CountCalls {
    currentCountCalls: number;
}

export interface CallResult {
    result: boolean;
    message: string;
}

export interface ActiveConnectionsInfoData {
    activeConnectionsInfo: ApiActiveConnectionsInfo[];
}

export interface ApiActiveConnectionsInfo {
    callId: number;
    connectionsData: ConnectionsData[];
}

export interface ConnectionsData {
    id: number;
    callConnectionId: number;
    externalParty: string;
    recordingState: string;
    partyConnectionId: number;
    referredBy: number;
    isOutbound: boolean;
    isInbound: boolean;
    dialedNumber: string;
    internalParty: string;
    internalPartyNumber: string;
    connectionCallStatus: ApiConnectionCallStatus;
    destinationNumber: string;
}
