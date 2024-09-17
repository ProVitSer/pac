/* eslint-disable @typescript-eslint/ban-types */
import { Client } from '@app/modules/client/entities/client.entity';
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EXTENSION_PACKAGE, EXTENSION_PROTO_PATH } from '../pac-extension.config';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { ExtensionServiceMethods, ExtensionServiceName } from '../interfaces/pac-extension.enum';
import {
    GetExtensionInfoRequest,
    ExtensionInfoReply,
    ExtensionStatusReply,
    GetExtensionStatusRequest,
    GetExtensionsReply,
    GetRegisteredExtensionsReply,
    GetExtensionDeviceInfoReply,
    GetExtensionDeviceInfoRequest,
    CreateExtensionRequest,
    DeleteExtensionReply,
    DeleteExtensionRequest,
    UpdateExtensionInfoRequest,
    SetExtensionForwardStatusRequest,
    SetExtensionGlobalQueuesStatusRequest,
    SetExtensionStatusInQueueRequest,
    SetExtensionCallForwardStatusRequest,
} from '../interfaces/pac-extension.interface';

@Injectable()
export class PacExtensionService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async getExtensionInfo(client: Client, data: GetExtensionInfoRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<GetExtensionInfoRequest, ExtensionInfoReply>(client, data, ExtensionServiceMethods.GetExtensionInfo);
    }

    public async getExtensionStatus(client: Client, data: GetExtensionStatusRequest): Promise<ExtensionStatusReply> {
        return await this.grpcSend<GetExtensionStatusRequest, ExtensionStatusReply>(
            client,
            data,
            ExtensionServiceMethods.GetExtensionStatus,
        );
    }

    public async getExtensions(client: Client): Promise<GetExtensionsReply> {
        return await this.grpcSend<{}, GetExtensionsReply>(client, new Empty(), ExtensionServiceMethods.GetExtensions);
    }

    public async getRegisteredExtensions(client: Client): Promise<GetRegisteredExtensionsReply> {
        return await this.grpcSend<{}, GetRegisteredExtensionsReply>(client, new Empty(), ExtensionServiceMethods.GetRegisteredExtensions);
    }

    public async getExtensionDeviceInfo(client: Client, data: GetExtensionDeviceInfoRequest): Promise<GetExtensionDeviceInfoReply> {
        return await this.grpcSend<GetExtensionDeviceInfoRequest, GetExtensionDeviceInfoReply>(
            client,
            data,
            ExtensionServiceMethods.GetExtensionDeviceInfo,
        );
    }

    public async createExtension(client: Client, data: CreateExtensionRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<CreateExtensionRequest, ExtensionInfoReply>(client, data, ExtensionServiceMethods.CreateExtension);
    }

    public async deleteExtension(client: Client, data: DeleteExtensionRequest): Promise<DeleteExtensionReply> {
        return await this.grpcSend<DeleteExtensionRequest, DeleteExtensionReply>(client, data, ExtensionServiceMethods.DeleteExtension);
    }

    public async updateExtensionInfo(client: Client, data: UpdateExtensionInfoRequest): Promise<DeleteExtensionReply> {
        return await this.grpcSend<UpdateExtensionInfoRequest, DeleteExtensionReply>(
            client,
            data,
            ExtensionServiceMethods.UpdateExtensionInfo,
        );
    }

    public async setExtensionForwardStatus(client: Client, data: SetExtensionForwardStatusRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionForwardStatusRequest, ExtensionInfoReply>(
            client,
            data,
            ExtensionServiceMethods.SetExtensionForwardStatus,
        );
    }

    public async setExtensionGlobalQueuesStatus(client: Client, data: SetExtensionGlobalQueuesStatusRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionGlobalQueuesStatusRequest, ExtensionInfoReply>(
            client,
            data,
            ExtensionServiceMethods.SetExtensionGlobalQueuesStatus,
        );
    }

    public async setExtensionStatusInQueue(client: Client, data: SetExtensionStatusInQueueRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionStatusInQueueRequest, ExtensionInfoReply>(
            client,
            data,
            ExtensionServiceMethods.SetExtensionStatusInQueue,
        );
    }

    public async setExtensionCallForwardStatus(client: Client, data: SetExtensionCallForwardStatusRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionCallForwardStatusRequest, ExtensionInfoReply>(
            client,
            data,
            ExtensionServiceMethods.SetExtensionCallForwardStatus,
        );
    }

    private async grpcSend<T, D>(client: Client, data: T, methodName: ExtensionServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            client,
            serviceName: ExtensionServiceName.ExtensionsPbxService,
            methodName,
            data,
            package: EXTENSION_PACKAGE,
            protoPath: EXTENSION_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
