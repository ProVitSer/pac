/* eslint-disable @typescript-eslint/ban-types */
import { Client } from '@app/modules/client/entities/client.entity';
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CALL_PACKAGE, CALL_PROTO_PATH } from '../pac-call.config';
import { CallServiceMethods, CallServiceName } from '../interfaces/pac-call.enum';
import {
    BaseCallReply,
    GetActiveCallsInfoReply,
    GetActiveConnectionsInfoReply,
    GetCountCallsReply,
    HangupCallRequest,
    MakeCallRequest,
    TrasferCallRequest,
} from '../interfaces/pac-call.interface';

import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

@Injectable()
export class PacCallService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async getActiveCallsInfo(client: Client): Promise<GetActiveCallsInfoReply> {
        return await this.grpcSend<{}, GetActiveCallsInfoReply>(client, new Empty(), CallServiceMethods.GetActiveCallsInfo);
    }

    public async getCountCalls(client: Client): Promise<GetCountCallsReply> {
        return await this.grpcSend<{}, GetCountCallsReply>(client, new Empty(), CallServiceMethods.GetCountCalls);
    }

    public async makeCall(client: Client, data: MakeCallRequest): Promise<BaseCallReply> {
        return await this.grpcSend<MakeCallRequest, BaseCallReply>(client, data, CallServiceMethods.MakeCall);
    }

    public async hangupCall(client: Client, data: HangupCallRequest): Promise<BaseCallReply> {
        return await this.grpcSend<HangupCallRequest, BaseCallReply>(client, data, CallServiceMethods.HangupCall);
    }

    public async transferCall(client: Client, data: TrasferCallRequest): Promise<BaseCallReply> {
        return await this.grpcSend<TrasferCallRequest, BaseCallReply>(client, data, CallServiceMethods.TransferCall);
    }

    public async getActiveConnectionsInfo(client: Client): Promise<GetActiveConnectionsInfoReply> {
        return await this.grpcSend<{}, GetActiveConnectionsInfoReply>(client, new Empty(), CallServiceMethods.GetActiveConnectionsInfo);
    }

    private async grpcSend<T, D>(client: Client, data: T, methodName: CallServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            client,
            serviceName: CallServiceName.CallPbxService,
            methodName,
            data,
            package: CALL_PACKAGE,
            protoPath: CALL_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
