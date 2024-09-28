import { ApiActiveConnectionsInfo } from '@app/modules/api/modules/call/interfaces/api-call.interface';
import { Client } from '@app/modules/client/entities/client.entity';
import { PacConnectorGrpcServer } from '@app/modules/pac-connector/entities/pac-connector-grpc-server.entity';
import { CallDirection } from './call-event-handler.enum';

export interface CallOnProcessEvent {
    client: Client;
    connector: PacConnectorGrpcServer;
    callHistoryId: string;
    activeConnectionsInfo: ApiActiveConnectionsInfo[];
}

export interface DetermineCallDirectionData {
    callHistoryId: string;
    callDireciton: CallDirection;
}
