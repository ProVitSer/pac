import { Inject, Injectable } from '@nestjs/common';
import { CreateTrunkData, TrunkStatusResult, VoipPbxService } from '../interfaces/voip.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voip } from '../entities/voip.entity';
import { Client } from '@app/modules/client/entities/client.entity';
import { TrunkType } from '../interfaces/voip.enum';
import { TrunkNotFoundException } from '../exceptions/trunk-not-found.exeption';
import UpdateTrunkDto from '../dto/update-trunk.dto';

@Injectable()
export class VoipService {
    constructor(
        @Inject('Asterisk') private readonly voipPbxService: VoipPbxService,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
    ) {}

    public async addNewTrunk(data: CreateTrunkData): Promise<TrunkStatusResult> {
        const trunk = await this.voipPbxService.addTrunk(data);

        const voip = await this.voipRepository.create({
            client: data.client,
            trunk_id: trunk.trunkId,
            trunk_type: data.trunkType,
            active: true,
        });

        await this.voipRepository.save(voip);

        await this.voipPbxService.updateTrunkRegisterStatus(trunk.trunkId);

        return this.getTrunkStatusById(trunk.trunkId);
    }

    public async getTrunkStatusByType(client: Client, trunkType: TrunkType): Promise<TrunkStatusResult> {
        const trunk = client.voip.filter((v: Voip) => v.trunk_type == trunkType);

        if (trunk.length) {
            const voip = await this.voipRepository.findOne({
                where: { trunk_id: trunk[0].trunk_id },
            });

            return {
                trunkId: trunk[0].trunk_id,
                trunkStatus: voip.trunk_status,
            };
        }

        throw new TrunkNotFoundException();
    }

    public async getTrunkStatusById(trunkId: string): Promise<TrunkStatusResult> {
        const voip = await this.voipRepository.findOne({
            where: { trunk_id: trunkId },
        });

        if (!voip) throw new TrunkNotFoundException();

        return {
            trunkId: voip.trunk_id,
            trunkStatus: voip.trunk_status,
        };
    }

    public async getTrunks(client: Client): Promise<Voip[]> {
        return client.voip;
    }
    public async deleteTrunk(client: Client, trunkId: string) {
        const voip = await this.voipRepository.findOne({
            where: { trunk_id: trunkId },
        });

        if (!voip) throw new TrunkNotFoundException();

        if (!client.voip.some((v: Voip) => v.trunk_id == trunkId)) throw new TrunkNotFoundException();

        await this.voipPbxService.deleteTrunk(trunkId);

        await this.voipRepository.delete({ trunk_id: trunkId });
    }

    public async updateTrunk(client: Client, trunkData: UpdateTrunkDto): Promise<TrunkStatusResult> {
        const voip = await this.voipRepository.findOne({
            where: { trunk_id: trunkData.trunkId },
        });

        if (!voip) throw new TrunkNotFoundException();

        if (!client.voip.some((v: Voip) => v.trunk_id == trunkData.trunkId)) throw new TrunkNotFoundException();

        const updateTrunk = await this.voipPbxService.updateTrunk({ client, voip, ...trunkData });

        await this.voipRepository.update({ trunk_id: trunkData.trunkId }, { trunk_id: updateTrunk.trunkId });

        return this.getTrunkStatusById(updateTrunk.trunkId);
    }
}
