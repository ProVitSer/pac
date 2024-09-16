import { Client } from '@app/modules/client/entities/client.entity';
import { PacCallService } from '@app/modules/pac-connector/modules/pac-call/services/pac-call.service';
import { Injectable } from '@nestjs/common';
import { ActiveCalls, ActiveConnectionsInfoData, CountCalls, CallResult } from '../interfaces/api-call.interface';
import { ActiveCallsInfoResultAdapter } from '../adapters/active-calls-info-result.adapter';
import MakeCallDto from '../dto/make-call.dto';
import HangupCallDto from '../dto/hangup-call.dto';
import TransferCallDto from '../dto/transfer-call.dto';

@Injectable()
export class ApiCallService {
    constructor(private readonly pacCallService: PacCallService) {}

    public async getActiveCallInfo(client: Client): Promise<ActiveCalls> {
        const activeCallsInfo = await this.pacCallService.getActiveCallsInfo(client);

        if (!('activeCallsInfoData' in activeCallsInfo)) return { activeCallsInfo: [] };

        return { activeCallsInfo: new ActiveCallsInfoResultAdapter(activeCallsInfo).activeCallsInfo };
    }

    public async getCountCalls(client: Client): Promise<CountCalls> {
        const countCalls = await this.pacCallService.getCountCalls(client);

        if (!('currentCountCalls' in countCalls)) return { currentCountCalls: 0 };

        return countCalls;
    }

    public async makeCall(client: Client, data: MakeCallDto): Promise<CallResult> {
        return await this.pacCallService.makeCall(client, data);
    }

    public async hangupCall(client: Client, data: HangupCallDto): Promise<CallResult> {
        return await this.pacCallService.hangupCall(client, data);
    }

    public async getActiveConnections(client: Client): Promise<ActiveConnectionsInfoData> {
        const activeConnectionsInfo = await this.pacCallService.getActiveConnectionsInfo(client);

        if (!('activeConnectionsInfo' in activeConnectionsInfo)) return { activeConnectionsInfo: [] };

        return activeConnectionsInfo;
    }

    public async transferCall(client: Client, data: TransferCallDto): Promise<CallResult> {
        return await this.pacCallService.transferCall(client, data);
    }
}
