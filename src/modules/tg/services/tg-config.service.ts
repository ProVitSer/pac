import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TgConfig } from '../entities/tg-config.entity';
import { Client } from '@app/modules/client/entities/client.entity';
import CreatTgConfig from '../dto/create-tg-config';
import DeleteTgConfig from '../dto/delete-tg-config';
import UpdateTgConfig from '../dto/update-tg-config';
import { BotManagerService } from './bot-manager.service';
import { CHECK_DEFAULT_MESSAGE } from '../tg.constants';

@Injectable()
export class TgConfigService {
    constructor(
        @InjectRepository(TgConfig)
        private tgConfigRepository: Repository<TgConfig>,
        private readonly botManagerService: BotManagerService,
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

        config.name = data.name;

        config.token = data.token;

        config.chatId = data.chatId;

        config.clientId = client.clientId;

        await this.tgConfigRepository.save(config);

        await this.reinacializeBots(client);
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

    private async reinacializeBots(client: Client) {
        const tgConfig = await this.getTgConfigs(client.clientId);

        await this.botManagerService.reinacializeBots(tgConfig);
    }

    public async sendTestMessage(id: number) {
        const tgConfig = await this.getTgConfig(id);

        await this.botManagerService.sendMessage(tgConfig.token, tgConfig.chatId, CHECK_DEFAULT_MESSAGE);
    }
}
