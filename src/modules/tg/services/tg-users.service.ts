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
import { GetTgUsersQuery, GetTgUsersResult, TgUsersData } from '../interfaces/tg.interface';
import { format } from 'date-fns';

@Injectable()
export class TgUsersService {
    constructor(
        @InjectRepository(TgUsers)
        private tgUsersRepository: Repository<TgUsers>,
        private readonly tgConfigService: TgConfigService,
    ) {}

    public async getTgUsers(client: Client, query: GetTgUsersQuery): Promise<GetTgUsersResult> {
        const tgConfig = await this.tgConfigService.getTgConfigs(client.clientId);

        const parsePage = parseInt(query.page || '1');

        const parsePageSize = parseInt(query.pageSize || '10');

        const ids = tgConfig.map((t: TgConfig) => t.id);

        const queryBuilder = this.tgUsersRepository
            .createQueryBuilder('tgUsers')
            .innerJoin('tgUsers.tgConfig', 'tgConfig')
            .where('tgConfig.id IN (:...ids)', { ids })
            .andWhere('tgUsers.deleted = false')
            .orderBy('tgUsers.id', 'DESC');

        if (query.name) {
            queryBuilder.andWhere('tgUsers.name ILIKE :name', { name: `%${query.name}%` });
        }

        const totalRecords = await queryBuilder.getCount();

        const tgUsers = await queryBuilder
            .skip((parsePage - 1) * parsePageSize)
            .take(parsePageSize)
            .getMany();

        const formattedUsers: TgUsersData[] = [];

        tgUsers.map((user: TgUsers) =>
            formattedUsers.push({
                id: user.id,
                name: user.name || '',
                tgUserName: user.tgUserName || '',
                extension: user.extension || '',
                date: format(new Date(user.createdAt), 'yyyy-MM-dd'),
            }),
        );

        return {
            data: formattedUsers,
            totalRecords: totalRecords || 0,
        };
    }

    public async createTgUser(client: Client, data: CreatTgUser): Promise<void> {
        const tgConfig = await this.tgConfigService.getTgConfigs(client.clientId);

        const config = this.tgUsersRepository.create();
        config.name = data.name;
        config.tgUserName = data.tgUserName;
        config.extension = data.extension;
        config.tgConfig = tgConfig;
        await this.tgUsersRepository.save(config);
    }

    public async deleteTgUser(client: Client, data: DeleteTgUser): Promise<void> {
        await this.tgUsersRepository.update(data.id, { deleted: true });
    }

    public async updateTgUser(client: Client, data: UpdateTgUser): Promise<TgUsers> {
        const { id, ...updateData } = data;

        const tgGonfigs = await this._getTgUsers(client);

        if (tgGonfigs.some((t: TgUsers) => t.id == id)) {
            await this.tgUsersRepository.update({ id }, { ...updateData });
        }

        return await this.getTgUser(id);
    }

    public async getTgUser(id: number): Promise<TgUsers> {
        return this.tgUsersRepository.findOne({ where: { id } });
    }

    public async getTgUserByTgUserName(tgUserName: string): Promise<TgUsers> {
        return this.tgUsersRepository.findOne({ where: { tgUserName } });
    }

    private async _getTgUsers(client: Client): Promise<TgUsers[]> {
        const tgConfig = await this.tgConfigService.getTgConfigs(client.clientId);

        const ids = tgConfig.map((t: TgConfig) => t.id);

        return this.tgUsersRepository
            .createQueryBuilder('tgUsers')
            .innerJoin('tgUsers.tgConfig', 'tgConfig')
            .where('tgConfig.id IN (:...ids)', { ids })
            .getMany();
    }
}
