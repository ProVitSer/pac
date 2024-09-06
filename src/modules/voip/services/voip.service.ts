import { Inject, Injectable } from '@nestjs/common';
import { CreateTrunkData, VoipPbxService } from '../interfaces/voip.interface';

@Injectable()
export class VoipService {
    constructor(@Inject('Asterisk') private readonly voipPbxService: VoipPbxService) {}

    public async addNewTrunk(data: CreateTrunkData) {
        await this.voipPbxService.addTrunk(data);
    }

    public async getTrunkStatus() {}

    public async deleteTrunk() {}

    public async sendCall() {}
}
