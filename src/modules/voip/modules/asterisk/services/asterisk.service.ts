/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    CreateTrunkData,
    CreateTrunkResult,
    SendCallData,
    SendCallResult,
    SendCallWithAudioData,
    UpdateTrunkData,
    UpdateTrunkResult,
    VoipPbxService,
} from '@app/modules/voip/interfaces/voip.interface';
import { Injectable } from '@nestjs/common';
import { SorceryService } from './sorcery.service';
import { AriService } from '../apis/ari/services/ari.service';
import { OriginateAction } from '../apis/ami/actions/originate.action';
import { PjsipShowRegistrationsOutboundAction } from '../apis/ami/actions/pjsip-show-registrations-outbound.action';
import { SendResiterAction } from '../apis/ami/actions/send-register.action';
import { CreateTrunkDataWithTrunkId, UpdateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';
import { AsteriskUtils } from '../utils/asterisk.utils';
import { UtilsService } from '@app/common/utils/utils.service';
import { TrunkNotFoundException } from '@app/modules/voip/exceptions/trunk-not-found.exeption';
import { OriginateCallStatus } from '@app/modules/voip/interfaces/voip.enum';

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
            trunkId: AsteriskUtils.getTrunkId(data.client.clientId, data.authId),
        };

        await this.sorceryService.findTrunkById(dataWithTrunkId.trunkId);

        const trunk = await this.sorceryService.createTrunk(dataWithTrunkId);

        UtilsService.sleep(5000);

        await this.sendResiterAction.sendRegisterToTrunk({ trunkId: trunk.trunkId });

        return trunk;
    }

    public async updateTrunkRegisterStatus(trunkId: string): Promise<void> {
        await this.pjsipShowRegistrationsOutboundAction.sendShowRegistrations();

        await UtilsService.sleep(10000);
    }

    public async deleteTrunk(trunkId: string): Promise<void> {
        await this.sorceryService.deleteTrunk(trunkId);
    }

    public async updateTrunk(data: UpdateTrunkData): Promise<UpdateTrunkResult> {
        const trunk = await this.sorceryService.findTrunkById(data.trunkId);

        if (!trunk) {
            throw new TrunkNotFoundException();
        }

        const dataWithTrunkId: UpdateTrunkDataWithTrunkId = {
            ...data,
            ...('authId' in data ? { trunkId: AsteriskUtils.getTrunkId(data.client.clientId, data.authId) } : { trunkId: data.trunkId }),
            originalTrunk: trunk,
        };

        const updateTrunk = await this.sorceryService.updateTrunk(dataWithTrunkId);

        await this.sendResiterAction.sendRegisterToTrunk({ trunkId: updateTrunk.trunkId });

        return updateTrunk;
    }

    public async sendCall(data: SendCallData): Promise<SendCallResult> {
        try {
            const uniqCallId = (await this.originateAction.originateCall({
                clientTrunkId: data.trunkId,
                dstNumber: data.dstNumber,
                srcNumber: data.srcNumber,
            })) as unknown as string;
            return {
                uniqCallId,
                originateCallStatus: OriginateCallStatus.successful,
            };
        } catch (e) {
            return {
                originateCallStatus: OriginateCallStatus.error,
            };
        }
    }

    public async sendCallWithAudio(data: SendCallWithAudioData): Promise<SendCallResult> {
        throw new Error('Method not implemented.');
    }
}
