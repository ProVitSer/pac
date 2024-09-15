import { Client } from '@app/modules/client/entities/client.entity';
import { GrpcServiceMethods, GrpcServiceName } from './pac-connector.enum';

export interface PacPayload {
    clientId: number;
}

export interface PacGrpcConnectorData<T> {
    client: Client;
    serviceName: GrpcServiceName;
    methodName: GrpcServiceMethods;
    data: T;
    package: string;
    protoPath: string;
}
