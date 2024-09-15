import { Client } from '@app/modules/client/entities/client.entity';
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CALL_PACKAGE, CALL_PROTO_PATH } from '../pac-call.config';
import { CallServiceMethods, CallServiceName } from '../interfaces/pac-call.enum';
import {
    BaseCallReply,
    CallServicePbxService,
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

    public async getActiveCallsInfo(client: Client): Promise<void> {
        // eslint-disable-next-line @typescript-eslint/ban-types
        await this.grpcSend<GetActiveCallsInfoReply, {}>(client, new Empty(), CallServiceMethods.GetActiveCallsInfo);
    }

    public async getCountCalls(client: Client): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async makeCall(client: Client): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async hangupCall(client: Client): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async transferCall(client: Client): Promise<void> {
        throw new Error('Method not implemented.');
    }
    public async getActiveConnectionsInfo(client: Client): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private async grpcSend<T, D>(client: Client, data: D, methodName: CallServiceMethods): Promise<T> {
        const pacGrpcConnectorData: PacGrpcConnectorData<D> = {
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
