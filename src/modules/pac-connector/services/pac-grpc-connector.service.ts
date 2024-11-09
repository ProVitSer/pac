import { PacConnectorGrpcServer } from '@app/modules/pac-connector/entities/pac-connector-grpc-server.entity';
import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ClientGrpc, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { PacConnectorTokenService } from './pac-connector-token.service';
import { Observable } from 'rxjs';
import { RedisService } from '@app/modules/redis/services/redis.service';
import { PacGrpcConnectorData } from '../interfaces/pac-connector.interface';
import { PacConnectorService } from './pac-connector.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class PacGrpcConnectorService {
    constructor(
        private readonly pacConnectorTokenService: PacConnectorTokenService,
        private readonly redisService: RedisService,
        private readonly pcs: PacConnectorService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async callGrpcMethod<T, D>(data: PacGrpcConnectorData<T>): Promise<Observable<D>> {
        try {
            const pcgs = await this.pcs._getPacConnector(data.clientId);

            const metadata = await this.getGrpcTokenMetadata(pcgs);

            const grpcClient = await this.getGrpcClient<T>(data, pcgs);

            return grpcClient.getService<D>(data.serviceName)[data.methodName](data.data, metadata);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    private async getGrpcClient<T>(data: PacGrpcConnectorData<T>, pcgs: PacConnectorGrpcServer): Promise<ClientGrpc> {
        const client = ClientProxyFactory.create({
            transport: Transport.GRPC,
            options: {
                package: data.package,
                protoPath: join(__dirname, data.protoPath),
                url: `${pcgs.ip}:${pcgs.port}`,
            },
        }) as ClientGrpc;

        return client;
    }

    private async getGrpcTokenMetadata(pcgs: PacConnectorGrpcServer): Promise<Metadata> {
        const clientToken = await this.redisService.hget(`client:${pcgs.clientId}`, 'token');

        const metadata = new Metadata();

        if (clientToken) {
            metadata.add('Authorization', `Bearer ${clientToken}`);
            return metadata;
        }

        const token = this.pacConnectorTokenService.generateToken(pcgs.clientId);

        await this.redisService.hset(`client:${pcgs.clientId}`, 'token', token);

        await this.redisService.expire(`client:${pcgs.clientId}`, 3600);

        metadata.add('Authorization', `Bearer ${token}`);

        return metadata;
    }
}
