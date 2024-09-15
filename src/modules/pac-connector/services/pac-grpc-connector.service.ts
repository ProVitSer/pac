import { PacConnectorGrpcServer } from '@app/modules/pac-connector/entities/pac-connector-grpc-server.entity';
import { Metadata } from '@grpc/grpc-js';
import { Injectable } from '@nestjs/common';
import { ClientGrpc, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PacConnectorTokenService } from './pac-connector-token.service';
import { Observable } from 'rxjs';

@Injectable()
export class PacGrpcConnectorService {
    private activeConnections: Map<number, ClientGrpc> = new Map();

    constructor(private readonly pacConnectorTokenService: PacConnectorTokenService) {}

    public async callGrpcMethod<T>(pcgs: PacConnectorGrpcServer, methodName: string, data: any): Promise<Observable<T>> {
        const metadata = this.getGrpcTokenMetadata(pcgs);

        const grpcClient = await this.getGrpcClient(pcgs);

        return grpcClient.getService<T>('SqlServicePbxService')[methodName](data, metadata);
    }

    private async getGrpcClient(pcgs: PacConnectorGrpcServer): Promise<ClientGrpc> {
        if (this.activeConnections.has(pcgs.clientId)) {
            return this.activeConnections.get(pcgs.clientId);
        }

        const client = ClientProxyFactory.create({
            transport: Transport.GRPC,
            options: {
                package: 'sql',
                protoPath: join(__dirname, '../modules/pac-sql/proto/sql.proto'),
                url: `${pcgs.ip}:${pcgs.port}`,
            },
        }) as ClientGrpc;

        this.activeConnections.set(pcgs.clientId, client);

        return client;
    }

    private closeConnection(clientId: number) {
        if (this.activeConnections.has(clientId)) {
            this.activeConnections.delete(clientId);
        }
    }

    private getGrpcTokenMetadata(pcgs: PacConnectorGrpcServer): Metadata {
        const token = this.pacConnectorTokenService.generateToken(pcgs.clientId);

        const metadata = new Metadata();

        metadata.add('Authorization', `Bearer ${token}`);

        return metadata;
    }
}
