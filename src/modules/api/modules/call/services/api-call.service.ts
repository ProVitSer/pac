import { PacCallService } from '@app/modules/pac-connector/modules/pac-call/services/pac-call.service';
import { Injectable } from '@nestjs/common';
import { ActiveCalls, ActiveConnectionsInfoData, CountCalls, CallResult } from '../interfaces/api-call.interface';
import { ActiveCallsInfoResultAdapter } from '../adapters/active-calls-info-result.adapter';
import MakeCallDto from '../dto/make-local-call.dto';
import HangupCallDto from '../dto/hangup-call.dto';
import { ActiveConnectionsInfoAdapter } from '../adapters/active-connections-info.adapter';
import MakeExternalCallDto from '../dto/make-external-call.dto';
import { VoipService } from '@app/modules/voip/services/voip.service';

@Injectable()
export class ApiCallService {
    constructor(
        private readonly pacCallService: PacCallService,
        private readonly voipService: VoipService,
    ) {}

    public async getActiveCallInfo(clientId: number): Promise<ActiveCalls> {
        const activeCallsInfo = await this.pacCallService.getActiveCallsInfo(clientId);

        if (!('activeCallsInfoData' in activeCallsInfo)) return { activeCallsInfo: [] };

        return { activeCallsInfo: new ActiveCallsInfoResultAdapter(activeCallsInfo).activeCallsInfo };
    }

    public async getCountCalls(clientId: number): Promise<CountCalls> {
        const countCalls = await this.pacCallService.getCountCalls(clientId);

        if (!('currentCountCalls' in countCalls)) return { currentCountCalls: 0 };

        return countCalls;
    }

    public async makeLocalCall(clientId: number, data: MakeCallDto): Promise<CallResult> {
        return await this.pacCallService.makeCall(clientId, data);
    }

    public async makeExternalCall(clientId: number, data: MakeExternalCallDto): Promise<void> {
        await this.voipService.makeExternalCall(clientId, data.externalNumber, data.localExtension);
    }

    public async hangupCall(clientId: number, data: HangupCallDto): Promise<CallResult> {
        return await this.pacCallService.hangupCall(clientId, data);
    }

    public async getActiveConnections(clientId: number): Promise<ActiveConnectionsInfoData> {
        const activeConnectionsInfo = await this.pacCallService.getActiveConnectionsInfo(clientId);

        if (!('activeConnectionsInfo' in activeConnectionsInfo)) return { activeConnectionsInfo: [] };

        return { activeConnectionsInfo: new ActiveConnectionsInfoAdapter(activeConnectionsInfo).activeConnectionsInfo };
    }
}
