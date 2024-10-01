/* eslint-disable @typescript-eslint/ban-types */
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { PSE_PACKAGE, PSE_PROTO_PATH } from '../pac-pbx-subscribe-event.config';
import { PbxSubscribeEventServiceMethods, PbxSubscribeEventServiceName } from '../interfaces/pac-pbx-subscribe-event.enum';

@Injectable()
export class PacPbxSubscribeEventService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async subscribeUpdateEvent(clientId: number): Promise<void> {
        await this.grpcSend<{}, void>(clientId, new Empty(), PbxSubscribeEventServiceMethods.SubscribeUpdateEvent);
    }

    public async subscribeInsertedEvent(clientId: number): Promise<void> {
        await this.grpcSend<{}, void>(clientId, new Empty(), PbxSubscribeEventServiceMethods.SubscribeInsertedEvent);
    }

    public async subscribeDeletedEvent(clientId: number): Promise<void> {
        await this.grpcSend<{}, void>(clientId, new Empty(), PbxSubscribeEventServiceMethods.SubscribeDeletedEvent);
    }

    public async unsubscribeDeletedEvent(clientId: number): Promise<void> {
        await this.grpcSend<{}, void>(clientId, new Empty(), PbxSubscribeEventServiceMethods.UnsubscribeDeletedEvent);
    }

    public async unsubscribeInsertedEvent(clientId: number): Promise<void> {
        await this.grpcSend<{}, void>(clientId, new Empty(), PbxSubscribeEventServiceMethods.UnsubscribeInsertedEvent);
    }

    public async unsubscribeUpdateEvent(clientId: number): Promise<void> {
        await this.grpcSend<{}, void>(clientId, new Empty(), PbxSubscribeEventServiceMethods.UnsubscribeUpdateEvent);
    }

    private async grpcSend<T, D>(clientId: number, data: T, methodName: PbxSubscribeEventServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            clientId,
            serviceName: PbxSubscribeEventServiceName.PbxSubscribeEventService,
            methodName,
            data,
            package: PSE_PACKAGE,
            protoPath: PSE_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
