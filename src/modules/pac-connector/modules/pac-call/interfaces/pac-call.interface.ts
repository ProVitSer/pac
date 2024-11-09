import { CallDirection, ActiveCallsStatus, ConnectionCallStatus } from './pac-call.enum';

export interface CallServicePbxService {
    getActiveCallsInfo(): Promise<GetActiveCallsInfoReply>;
    getCountCalls(): Promise<GetCountCallsReply>;
    makeCall(data: MakeCallRequest): Promise<BaseCallReply>;
    hangupCall(data: HangupCallRequest): Promise<BaseCallReply>;
    transferCall(data: TrasferCallRequest): Promise<BaseCallReply>;
    getActiveConnectionsInfo(): Promise<GetActiveConnectionsInfoReply>;
}

export interface GetActiveCallsInfoReply {
    activeCallsInfoData?: GetActiveCallsInfoData[];
}

export interface ActiveConnectionsInfo {
    callId: number;
    connectionsData: ConnectionsData[];
}

export interface ConnectionsData {
    id: number;
    callConnectionId: number;
    externalParty: string;
    recordingState: string;
    partyConnectionId: number;
    referredBy?: number;
    isOutbound?: boolean;
    isInbound?: boolean;
    dialedNumber: string;
    internalParty: string;
    internalPartyNumber: string;
    connectionCallStatus: ConnectionCallStatus;
    destinationNumber: string;
}

export interface GetCountCallsReply {
    currentCountCalls: number;
}

export interface MakeCallRequest {
    to: string;
    from: string;
}

export interface BaseCallReply {
    result: boolean;
    message: string;
}

export interface HangupCallRequest {
    extension: string;
}

export interface TrasferCallRequest {
    callId: number;
    dn: string;
    numberTo: string;
}

export interface GetActiveConnectionsInfoReply {
    activeConnectionsInfo: ActiveConnectionsInfo[];
}

export interface GetActiveCallsInfoData {
    callId: number;
    callDirection: CallDirection;
    status: ActiveCallsStatus;
    localNumber: string;
    remoteNumber: string;
    direction?: string;
    callStatus?: string;
}
