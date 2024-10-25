import { Client } from '@app/modules/client/entities/client.entity';
import { GrpcServiceMethods, GrpcServiceName } from './pac-connector.enum';
import { Request } from 'express';
import { PacConnectorGrpcServer } from '../entities/pac-connector-grpc-server.entity';

export interface PacPayload {
    clientId: number;
}

export interface PacGrpcConnectorData<T> {
    clientId: number;
    serviceName: GrpcServiceName;
    methodName: GrpcServiceMethods;
    data: T;
    package: string;
    protoPath: string;
}

export interface RequestWithPacInfo extends Request {
    client: Client;
    connector: PacConnectorGrpcServer;
}

export interface CheckConnectionResult {
    online: boolean;
}
