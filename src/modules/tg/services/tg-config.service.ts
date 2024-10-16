import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TgConfig } from '../entities/tg-config.entity';
import { Client } from '@app/modules/client/entities/client.entity';
import CreatTgConfig from '../dto/create-tg-config';
import DeleteTgConfig from '../dto/delete-tg-config';
import UpdateTgConfig from '../dto/update-tg-config';

@Injectable()
export class TgConfigService {
    constructor(
        @InjectRepository(TgConfig)
        private tgConfigRepository: Repository<TgConfig>,
    ) {}

    public async getTgConfigs(clientId: number): Promise<TgConfig[]> {
        return this.tgConfigRepository.find({
            where: { clientId: clientId },
        });
    }

    public async getTgConfigList(): Promise<TgConfig[]> {
        return this.tgConfigRepository.find();
    }

    public async createTgConfig(client: Client, data: CreatTgConfig): Promise<void> {
        const config = this.tgConfigRepository.create();
        config.token = data.token;
        config.chatId = data.chatId;
        config.clientId = client.clientId;
        await this.tgConfigRepository.save(config);
    }

    public async deleteTgConfig(client: Client, data: DeleteTgConfig): Promise<void> {
        await this.tgConfigRepository.delete({ id: data.id });
    }

    public async updateTgConfig(client: Client, data: UpdateTgConfig): Promise<TgConfig> {
        const { id, ...updateData } = data;

        const tgGonfigs = await this.getTgConfigs(client.clientId);

        if (tgGonfigs.some((t: TgConfig) => t.id == id)) {
            await this.tgConfigRepository.update({ id }, { ...updateData });
        }

        return await this.getTgConfig(id);
    }

    public async getTgConfig(id: number): Promise<TgConfig> {
        return this.tgConfigRepository.findOne({ where: { id } });
    }
}
