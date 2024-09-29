import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MissedCall } from '../entities/missed-call.entity';
import AddMissedCallConfig from '../dto/add-missed-call-config.dto';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { Client } from '@app/modules/client/entities/client.entity';
import UpdateMissedCall from '../dto/update-missed-call.dto';

@Injectable()
export class MissedCallService {
    constructor(
        @InjectRepository(MissedCall)
        private missedCallRepository: Repository<MissedCall>,
        private readonly pacSqlService: PacSqlService,
    ) {}

    public async getMissedCallConfigList(clientId: number): Promise<MissedCall[]> {
        return this.missedCallRepository.find({
            where: { clientId: clientId },
        });
    }

    public async getMissedCallConfigById(clientId: number, id: number): Promise<MissedCall> {
        return this.missedCallRepository.findOne({
            where: { id },
        });
    }

    public async addMissedCallConfig(clientId: number, missedCallConfig: AddMissedCallConfig): Promise<void> {
        const missedCall = this.missedCallRepository.create();
        missedCall.trunkName = missedCallConfig.trunkName;
        missedCall.missedServiceType = missedCallConfig.missedServiceType;
        missedCall.clientId = clientId;
        await this.missedCallRepository.save(missedCall);
    }

    public async deleteMissedCall(clientId: number, id: number): Promise<void> {
        await this.missedCallRepository.delete({ id });
    }

    public async getTrunkName(client: Client): Promise<string[]> {
        return await this.getTrunks(client);
    }

    public async updateMissedCall(clientId: number, data: UpdateMissedCall): Promise<MissedCall[]> {
        const { id, ...updateData } = data;

        const tgGonfigs = await this.getMissedCallConfigList(clientId);

        if (tgGonfigs.some((m: MissedCall) => m.id == id)) {
            await this.missedCallRepository.update({ id }, { ...updateData });
        }

        return await this.getMissedCallConfigList(id);
    }

    private async getTrunks(client: Client): Promise<string[]> {
        const sql = `SELECT name from gateway`;

        const result = await this.pacSqlService.sqlRequest(client, { query: sql });

        const parseResult = JSON.parse(result.result);

        if (parseResult[0].length != 0) {
            const trunkName = [];

            parseResult.map((t: string[]) => {
                trunkName.push(t[0]);
            });

            return trunkName;
        }

        return [];
    }
}
