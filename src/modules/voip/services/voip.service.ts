/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { VoipPbxService } from '../interfaces/voip.interface';
import { TrunkType } from '../interfaces/voip.enum';

@Injectable()
export class VoipService {
    constructor(@Inject('Asterisk') private readonly voipPbxService: VoipPbxService) {}

    public async addNewTrunk(voip: any) {
        const result = await this.voipPbxService.addTrunk({
            clientId: 123121111,
            trunkType: TrunkType.call,
            authId: '111111111',
            authPassword: 'mMa8Okme3z',
            pbxIp: 'localhost',
        });
        console.log(result);
    }

    public async getTrunkStatus() {}

    public async deleteTrunk() {}

    public async sendCall() {}
}
