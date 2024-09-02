/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    AddTrunkData,
    AddTrunkResult,
    SendCallData,
    SendCallResult,
    SendCallWithAudioData,
    TrunkStatusResult,
    VoipPbxService,
} from '@app/modules/voip/interfaces/voip.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AstersikService implements VoipPbxService {
    constructor() {}
    addTrunk(data: AddTrunkData): Promise<AddTrunkResult> {
        throw new Error('Method not implemented.');
    }
    getTrunkStatus(trunkId: string): Promise<TrunkStatusResult> {
        throw new Error('Method not implemented.');
    }
    sendCall(data: SendCallData): Promise<SendCallResult> {
        throw new Error('Method not implemented.');
    }
    sendCallWithAudio(data: SendCallWithAudioData): Promise<SendCallResult> {
        throw new Error('Method not implemented.');
    }
}
