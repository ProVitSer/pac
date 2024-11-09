/* eslint-disable @typescript-eslint/ban-types */
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

    public async getExtensionInfo(clientId: number, data: GetExtensionInfoRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<GetExtensionInfoRequest, ExtensionInfoReply>(clientId, data, ExtensionServiceMethods.GetExtensionInfo);
    }

    public async getExtensionStatus(clientId: number, data: GetExtensionStatusRequest): Promise<ExtensionStatusReply> {
        return await this.grpcSend<GetExtensionStatusRequest, ExtensionStatusReply>(
            clientId,
            data,
            ExtensionServiceMethods.GetExtensionStatus,
        );
    }

    public async getExtensions(clientId: number): Promise<GetExtensionsReply> {
        return await this.grpcSend<{}, GetExtensionsReply>(clientId, new Empty(), ExtensionServiceMethods.GetExtensions);
    }

    public async getRegisteredExtensions(clientId: number): Promise<GetRegisteredExtensionsReply> {
        return await this.grpcSend<{}, GetRegisteredExtensionsReply>(
            clientId,
            new Empty(),
            ExtensionServiceMethods.GetRegisteredExtensions,
        );
    }

    public async getExtensionDeviceInfo(clientId: number, data: GetExtensionDeviceInfoRequest): Promise<GetExtensionDeviceInfoReply> {
        return await this.grpcSend<GetExtensionDeviceInfoRequest, GetExtensionDeviceInfoReply>(
            clientId,
            data,
            ExtensionServiceMethods.GetExtensionDeviceInfo,
        );
    }

    public async createExtension(clientId: number, data: CreateExtensionRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<CreateExtensionRequest, ExtensionInfoReply>(clientId, data, ExtensionServiceMethods.CreateExtension);
    }

    public async deleteExtension(clientId: number, data: DeleteExtensionRequest): Promise<DeleteExtensionReply> {
        return await this.grpcSend<DeleteExtensionRequest, DeleteExtensionReply>(clientId, data, ExtensionServiceMethods.DeleteExtension);
    }

    public async updateExtensionInfo(clientId: number, data: UpdateExtensionInfoRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<UpdateExtensionInfoRequest, ExtensionInfoReply>(
            clientId,
            data,
            ExtensionServiceMethods.UpdateExtensionInfo,
        );
    }

    public async setExtensionForwardStatus(clientId: number, data: SetExtensionForwardStatusRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionForwardStatusRequest, ExtensionInfoReply>(
            clientId,
            data,
            ExtensionServiceMethods.SetExtensionForwardStatus,
        );
    }

    public async setExtensionGlobalQueuesStatus(
        clientId: number,
        data: SetExtensionGlobalQueuesStatusRequest,
    ): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionGlobalQueuesStatusRequest, ExtensionInfoReply>(
            clientId,
            data,
            ExtensionServiceMethods.SetExtensionGlobalQueuesStatus,
        );
    }

    public async setExtensionStatusInQueue(clientId: number, data: SetExtensionStatusInQueueRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionStatusInQueueRequest, ExtensionInfoReply>(
            clientId,
            data,
            ExtensionServiceMethods.SetExtensionStatusInQueue,
        );
    }

    public async setExtensionCallForwardStatus(clientId: number, data: SetExtensionCallForwardStatusRequest): Promise<ExtensionInfoReply> {
        return await this.grpcSend<SetExtensionCallForwardStatusRequest, ExtensionInfoReply>(
            clientId,
            data,
            ExtensionServiceMethods.SetExtensionCallForwardStatus,
        );
    }

    private async grpcSend<T, D>(clientId: number, data: T, methodName: ExtensionServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            clientId,
            serviceName: ExtensionServiceName.ExtensionsPbxService,
            methodName,
            data,
            package: EXTENSION_PACKAGE,
            protoPath: EXTENSION_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
