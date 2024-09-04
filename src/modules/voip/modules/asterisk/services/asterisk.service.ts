/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    CreateTrunkData,
    CreateTrunkResult,
    SendCallData,
    SendCallResult,
    SendCallWithAudioData,
    TrunkStatusResult,
    VoipPbxService,
} from '@app/modules/voip/interfaces/voip.interface';
import { Injectable } from '@nestjs/common';
import { SorceryService } from './sorcery.service';
import { AriService } from '../apis/ari/services/ari.service';
import { OriginateAction } from '../apis/ami/actions/originate.action';
import { RegistrationStatusAction } from '../apis/ami/actions/registration-status.action';
import { SendResiterAction } from '../apis/ami/actions/send-register.action';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';
import { AsteriskUtils } from '../utils/asterisk.utils';

@Injectable()
export class AstersikService implements VoipPbxService {
    constructor(
        private readonly sorceryService: SorceryService,
        private readonly ariService: AriService,
        private readonly originateAction: OriginateAction,
        private readonly registrationStatusAction: RegistrationStatusAction,
        private readonly sendResiterAction: SendResiterAction,
    ) {}

    public async addTrunk(data: CreateTrunkData): Promise<CreateTrunkResult> {
        const dataWithTrunkId: CreateTrunkDataWithTrunkId = { ...data, trunkId: AsteriskUtils.getTrunkId(data.clientId, data.authId) };

        await this.sorceryService.findTrunkById(dataWithTrunkId.trunkId);

        return await this.sorceryService.createTrunk(dataWithTrunkId);
    }
    public async getTrunkStatus(trunkId: string): Promise<TrunkStatusResult> {
        throw new Error('Method not implemented.');
    }
    public async sendCall(data: SendCallData): Promise<SendCallResult> {
        throw new Error('Method not implemented.');
    }
    public async sendCallWithAudio(data: SendCallWithAudioData): Promise<SendCallResult> {
        throw new Error('Method not implemented.');
    }
}
