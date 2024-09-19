/* eslint-disable @typescript-eslint/ban-types */
import { Client } from '@app/modules/client/entities/client.entity';
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

    public async subscribeUpdateEvent(client: Client): Promise<void> {
        await this.grpcSend<{}, void>(client, new Empty(), PbxSubscribeEventServiceMethods.SubscribeUpdateEvent);
    }

    public async subscribeInsertedEvent(client: Client): Promise<void> {
        await this.grpcSend<{}, void>(client, new Empty(), PbxSubscribeEventServiceMethods.SubscribeInsertedEvent);
    }

    public async subscribeDeletedEvent(client: Client): Promise<void> {
        await this.grpcSend<{}, void>(client, new Empty(), PbxSubscribeEventServiceMethods.SubscribeDeletedEvent);
    }

    public async unsubscribeDeletedEvent(client: Client): Promise<void> {
        await this.grpcSend<{}, void>(client, new Empty(), PbxSubscribeEventServiceMethods.UnsubscribeDeletedEvent);
    }

    public async unsubscribeInsertedEvent(client: Client): Promise<void> {
        await this.grpcSend<{}, void>(client, new Empty(), PbxSubscribeEventServiceMethods.UnsubscribeInsertedEvent);
    }

    public async unsubscribeUpdateEvent(client: Client): Promise<void> {
        await this.grpcSend<{}, void>(client, new Empty(), PbxSubscribeEventServiceMethods.UnsubscribeUpdateEvent);
    }

    private async grpcSend<T, D>(client: Client, data: T, methodName: PbxSubscribeEventServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            client,
            serviceName: PbxSubscribeEventServiceName.PbxSubscribeEventService,
            methodName,
            data,
            package: PSE_PACKAGE,
            protoPath: PSE_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
