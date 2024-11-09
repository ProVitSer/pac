import { Inject, Injectable } from '@nestjs/common';
import { CreateTrunkData, SendCallResult, TrunkDataResult, VoipPbxService } from '../interfaces/voip.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voip } from '../entities/voip.entity';
import { Client } from '@app/modules/client/entities/client.entity';
import { TrunkNotFoundException } from '../exceptions/trunk-not-found.exeption';
import UpdateTrunkDto from '../dto/update-trunk.dto';
import { ApplicationServiceType } from '@app/common/interfaces/enums';

@Injectable()
export class VoipService {
    constructor(
        @Inject('Asterisk') private readonly voipPbxService: VoipPbxService,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
    ) {}

    public async addNewTrunk(data: CreateTrunkData): Promise<TrunkDataResult> {
        const trunk = await this.voipPbxService.addTrunk(data);

        const voip = await this.voipRepository.create({
            client: data.client,
            trunkId: trunk.trunkId,
            applicationServiceType: data.applicationServiceType,
            active: true,
        });

        await this.voipRepository.save(voip);

        await this.voipPbxService.updateTrunkRegisterStatus(trunk.trunkId);

        return this.getTrunkDataById(trunk.trunkId);
    }

    public async getTrunkStatusByType(client: Client, applicationServiceType: ApplicationServiceType): Promise<TrunkDataResult> {
        const trunk = client.voip.filter((v: Voip) => v.applicationServiceType == applicationServiceType);

        if (trunk.length) {
            const voip = await this.voipRepository.findOne({
                where: { trunkId: trunk[0].trunkId },
            });

            const trunkData = await this.voipPbxService.getTrunkInfo(trunk[0].trunkId);

            return {
                trunkId: trunk[0].trunkId,
                trunkStatus: voip.trunkStatus,
                trunkData,
            };
        }

        throw new TrunkNotFoundException();
    }

    public async getTrunkDataById(trunkId: string): Promise<TrunkDataResult> {
        const voip = await this.voipRepository.findOne({
            where: { trunkId: trunkId },
        });

        if (!voip) throw new TrunkNotFoundException();

        const trunkData = await this.voipPbxService.getTrunkInfo(voip.trunkId);

        return {
            trunkId: voip.trunkId,
            trunkStatus: voip.trunkStatus,
            trunkData,
        };
    }

    public async getTrunksData(client: Client): Promise<TrunkDataResult[]> {
        const voip = client.voip;

        const result: TrunkDataResult[] = [];

        for (const v of voip) {
            result.push(await this.getTrunkDataById(v.trunkId));
        }

        return result;
    }

    public async getTrunks(client: Client): Promise<Voip[]> {
        return client.voip;
    }
    public async deleteTrunk(client: Client, trunkId: string) {
        const voip = await this.voipRepository.findOne({
            where: { trunkId: trunkId },
        });

        if (!voip) throw new TrunkNotFoundException();

        if (!client.voip.some((v: Voip) => v.trunkId == trunkId)) throw new TrunkNotFoundException();

        await this.voipPbxService.deleteTrunk(trunkId);

        await this.voipRepository.delete({ trunkId: trunkId });
    }

    public async updateTrunk(client: Client, trunkData: UpdateTrunkDto): Promise<TrunkDataResult> {
        const voip = await this.voipRepository.findOne({
            where: { trunkId: trunkData.trunkId },
        });

        if (!voip) throw new TrunkNotFoundException();

        if (!client.voip.some((v: Voip) => v.trunkId == trunkData.trunkId)) throw new TrunkNotFoundException();

        const updateTrunk = await this.voipPbxService.updateTrunk({ client, voip, ...trunkData });

        await this.voipRepository.update({ trunkId: trunkData.trunkId }, { trunkId: updateTrunk.trunkId });

        return this.getTrunkDataById(updateTrunk.trunkId);
    }

    public async makeExternalCall(clientId: number, dstNumber: string, srcNumber: string): Promise<SendCallResult> {
        const voip = await this.voipRepository.findOne({
            where: {
                applicationServiceType: ApplicationServiceType.cqa,
                client: {
                    clientId: clientId,
                },
            },
            relations: ['client'],
        });

        if (!voip) throw new TrunkNotFoundException();

        return await this.voipPbxService.sendCall({
            clientId,
            trunkId: voip.trunkId,
            dstNumber,
            srcNumber,
        });
    }
}
