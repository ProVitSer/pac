/* eslint-disable @typescript-eslint/ban-types */
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

    public async getActiveCallsInfo(clientId: number): Promise<GetActiveCallsInfoReply> {
        return await this.grpcSend<{}, GetActiveCallsInfoReply>(clientId, new Empty(), CallServiceMethods.GetActiveCallsInfo);
    }

    public async getCountCalls(clientId: number): Promise<GetCountCallsReply> {
        return await this.grpcSend<{}, GetCountCallsReply>(clientId, new Empty(), CallServiceMethods.GetCountCalls);
    }

    public async makeCall(clientId: number, data: MakeCallRequest): Promise<BaseCallReply> {
        return await this.grpcSend<MakeCallRequest, BaseCallReply>(clientId, data, CallServiceMethods.MakeCall);
    }

    public async hangupCall(clientId: number, data: HangupCallRequest): Promise<BaseCallReply> {
        return await this.grpcSend<HangupCallRequest, BaseCallReply>(clientId, data, CallServiceMethods.HangupCall);
    }

    public async transferCall(clientId: number, data: TrasferCallRequest): Promise<BaseCallReply> {
        return await this.grpcSend<TrasferCallRequest, BaseCallReply>(clientId, data, CallServiceMethods.TransferCall);
    }

    public async getActiveConnectionsInfo(clientId: number): Promise<GetActiveConnectionsInfoReply> {
        return await this.grpcSend<{}, GetActiveConnectionsInfoReply>(clientId, new Empty(), CallServiceMethods.GetActiveConnectionsInfo);
    }

    private async grpcSend<T, D>(clientId: number, data: T, methodName: CallServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            clientId,
            serviceName: CallServiceName.CallPbxService,
            methodName,
            data,
            package: CALL_PACKAGE,
            protoPath: CALL_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
