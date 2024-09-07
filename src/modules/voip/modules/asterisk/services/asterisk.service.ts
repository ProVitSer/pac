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
import { PjsipShowRegistrationsOutboundAction } from '../apis/ami/actions/pjsip-show-registrations-outbound.action';
import { SendResiterAction } from '../apis/ami/actions/send-register.action';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';
import { AsteriskUtils } from '../utils/asterisk.utils';
import { UtilsService } from '@app/common/utils/utils.service';

@Injectable()
export class AstersikService implements VoipPbxService {
    constructor(
        private readonly sorceryService: SorceryService,
        private readonly ariService: AriService,
        private readonly originateAction: OriginateAction,
        private readonly pjsipShowRegistrationsOutboundAction: PjsipShowRegistrationsOutboundAction,
        private readonly sendResiterAction: SendResiterAction,
    ) {}

    public async addTrunk(data: CreateTrunkData): Promise<CreateTrunkResult> {
        const dataWithTrunkId: CreateTrunkDataWithTrunkId = {
            ...data,
            trunkId: AsteriskUtils.getTrunkId(data.client.client_id, data.authId),
        };

        await this.sorceryService.findTrunkById(dataWithTrunkId.trunkId);

        const trunk = await this.sorceryService.createTrunk(dataWithTrunkId);

        UtilsService.sleep(5000);

        await this.sendResiterAction.sendRegisterToTrunk({ trunkId: trunk.trinkId });

        return trunk;
    }

    public async updateTrunkRegisterStatus(trunkId: string): Promise<void> {
        await this.pjsipShowRegistrationsOutboundAction.sendShowRegistrations();

        await UtilsService.sleep(10000);
    }

    public async sendCall(data: SendCallData): Promise<SendCallResult> {
        throw new Error('Method not implemented.');
    }

    public async sendCallWithAudio(data: SendCallWithAudioData): Promise<SendCallResult> {
        throw new Error('Method not implemented.');
    }
}
