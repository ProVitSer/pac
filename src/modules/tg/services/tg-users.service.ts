import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '@app/modules/client/entities/client.entity';
import { TgUsers } from '../entities/tg-users.entity';
import { TgConfigService } from './tg-config.service';
import CreatTgUser from '../dto/create-tg-user';
import DeleteTgUser from '../dto/delete-tg-user';
import UpdateTgUser from '../dto/update-tg-user';
import { TgConfig } from '../entities/tg-config.entity';

@Injectable()
export class TgUsersService {
    constructor(
        @InjectRepository(TgUsers)
        private tgUsersRepository: Repository<TgUsers>,
        private readonly tgConfigService: TgConfigService,
    ) {}

    public async getTgUsers(client: Client): Promise<TgUsers[]> {
        const tgConfig = await this.tgConfigService.getTgConfigs(client);

        const ids = tgConfig.map((t: TgConfig) => t.id);

        return this.tgUsersRepository
            .createQueryBuilder('tgUsers')
            .innerJoin('tgUsers.tgConfig', 'tgConfig')
            .where('tgConfig.id IN (:...ids)', { ids })
            .getMany();
    }

    public async createTgUser(client: Client, data: CreatTgUser): Promise<void> {
        const tgConfig = await this.tgConfigService.getTgConfigs(client);

        const config = this.tgUsersRepository.create();
        config.userName = data.userName;
        config.extension = data.extension;
        config.tgConfig = tgConfig;
        await this.tgUsersRepository.save(config);
    }

    public async deleteTgUser(client: Client, data: DeleteTgUser): Promise<void> {
        await this.tgUsersRepository.delete({ id: data.id });
    }

    public async updateTgUser(client: Client, data: UpdateTgUser): Promise<TgUsers> {
        const { id, ...updateData } = data;

        const tgGonfigs = await this.getTgUsers(client);

        if (tgGonfigs.some((t: TgUsers) => t.id == id)) {
            await this.tgUsersRepository.update({ id }, { ...updateData });
        }

        return await this.getTgUser(id);
    }

    public async getTgUser(id: number): Promise<TgUsers> {
        return this.tgUsersRepository.findOne({ where: { id } });
    }

    public async getTgUserByUsername(userName: string): Promise<TgUsers> {
        return this.tgUsersRepository.findOne({ where: { userName } });
    }
}
