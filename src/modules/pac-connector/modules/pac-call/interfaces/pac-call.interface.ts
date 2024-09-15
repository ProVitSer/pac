import { CallDirection, ActiveCallsStatus } from './pac-call.enum';

export interface CallServicePbxService {
    getActiveCallsInfo(data: GetActiveCallsInfoRequest): Promise<GetActiveCallsInfoReply>;
    getCountCalls(): Promise<GetCountCallsReply>;
    makeCall(data: MakeCallRequest): Promise<BaseCallReply>;
    hangupCall(data: HangupCallRequest): Promise<BaseCallReply>;
    transferCall(data: TrasferCallRequest): Promise<BaseCallReply>;
    getActiveConnectionsInfo(): Promise<GetActiveConnectionsInfoReply>;
}

export interface GetActiveCallsInfoRequest {
    get: string;
}

export interface GetActiveCallsInfoReply {
    active_calls_info_data?: GetActiveCallsInfoData[];
}

export interface ActiveConnectionsInfo {
    call_id: number;
    connections_data: ConnectionsData;
}

export interface ConnectionsData {
    id: number;
    call_connection_id: number;
    external_party: string;
    recording_state: string;
    party_connection_id: number;
    referred_by: number;
    is_outbound: boolean;
    is_inbound: boolean;
    dialed_number: string;
    internal_party: string;
    internal_party_number: string;
}

export interface GetCountCallsReply {
    current_count_calls: number;
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
    call_id: number;
    party_connection_id: number;
    destination_number: string;
}

export interface GetActiveConnectionsInfoReply {
    active_connections_info: ActiveConnectionsInfo;
}

export interface GetActiveCallsInfoData {
    call_id: number;
    call_direction: CallDirection;
    status: ActiveCallsStatus;
    local_number: string;
    remote_number: string;
    direction?: string;
    call_status?: string;
}
