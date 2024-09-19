/* eslint-disable @typescript-eslint/ban-types */
import { Client } from '@app/modules/client/entities/client.entity';
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { QUEUE_PACKAGE, QUEUE_PROTO_PATH } from '../pac-queue.config';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { QueueServiceMethods, QueueServiceName } from '../interfaces/pac-queue.enum';
import {
    QueueInfoReply,
    QueueInfoRequest,
    QueueListDataReply,
    QueueModifyReply,
    QueueModifyRequest,
} from '../interfaces/pac-queue.interface';

@Injectable()
export class PacQueueService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async getQueueList(client: Client): Promise<QueueListDataReply> {
        return await this.grpcSend<{}, QueueListDataReply>(client, new Empty(), QueueServiceMethods.GetQueueList);
    }

    public async getQueueAgents(client: Client, data: QueueInfoRequest): Promise<QueueInfoReply> {
        return await this.grpcSend<QueueInfoRequest, QueueInfoReply>(client, data, QueueServiceMethods.GetQueueAgents);
    }

    public async getFreeQueueAgents(client: Client, data: QueueInfoRequest): Promise<QueueInfoReply> {
        return await this.grpcSend<QueueInfoRequest, QueueInfoReply>(client, data, QueueServiceMethods.GetFreeQueueAgents);
    }

    public async getBusyQueueAgents(client: Client, data: QueueInfoRequest): Promise<QueueInfoReply> {
        return await this.grpcSend<QueueInfoRequest, QueueInfoReply>(client, data, QueueServiceMethods.GetBusyQueueAgents);
    }

    public async addAgentsToQueue(client: Client, data: QueueModifyRequest): Promise<QueueModifyReply> {
        return await this.grpcSend<QueueModifyRequest, QueueModifyReply>(client, data, QueueServiceMethods.AddAgentsToQueue);
    }

    public async deleteAgentsFromQueue(client: Client, data: QueueModifyRequest): Promise<QueueModifyReply> {
        return await this.grpcSend<QueueModifyRequest, QueueModifyReply>(client, data, QueueServiceMethods.DeleteAgentsFromQueue);
    }

    private async grpcSend<T, D>(client: Client, data: T, methodName: QueueServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            client,
            serviceName: QueueServiceName.QueuePbxService,
            methodName,
            data,
            package: QUEUE_PACKAGE,
            protoPath: QUEUE_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
