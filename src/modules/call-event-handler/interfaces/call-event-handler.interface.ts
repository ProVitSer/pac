import { Client } from '@app/modules/client/entities/client.entity';
import { PacConnectorGrpcServer } from '@app/modules/pac-connector/entities/pac-connector-grpc-server.entity';

export interface CallRingingEvent {
    client: Client;
    connector: PacConnectorGrpcServer;
    callId: string;
}
