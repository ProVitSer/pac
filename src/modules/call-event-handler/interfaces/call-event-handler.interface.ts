import { ApiActiveConnectionsInfo } from '@app/modules/api/modules/call/interfaces/api-call.interface';
import { PacConnectorGrpcServer } from '@app/modules/pac-connector/entities/pac-connector-grpc-server.entity';
import { CallDirection } from './call-event-handler.enum';

export interface CallOnProcessEvent {
    clientId: number;
    connector: PacConnectorGrpcServer;
    callHistoryId: string;
    activeConnectionsInfo: ApiActiveConnectionsInfo[];
}

export interface DetermineCallDirectionData {
    callHistoryId: string;
    callDireciton: CallDirection;
}

export interface CallRingingData extends CallOnProcessEvent {
    callDireciton: CallDirection;
}

export interface FullCallInfo {
    segmentId: string;
    srcId: string;
    startTime: string;
    endTime: string;
    srcDisplayName: string;
    srcCallerNnumber: string;
    srcDn: string;
    dstExtendedDisplayName: string;
    dstDisplayName: string;
    dstDn: string;
    dstCallerNumber: string;
    dstParticipantId: string;
    callTime: number;
    dstRecordingUrl?: string;
    srcRecordingUrl?: string;
    operatorName: string;
    isDstInUsers: boolean;
    callAnswered: boolean;
}
