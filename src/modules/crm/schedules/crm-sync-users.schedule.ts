import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CrmApiService } from '../services/crm-api.service';
import { CrmUsers } from '../entities/crm-users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmConfig } from '../entities/crm-config.entity';
import { BitirxUserGet } from '../interfaces/crm.interface';

@Injectable()
export class CrmSyncUsersSchedule {
    private readonly startPage: number = 0;
    private readonly addToNextPage: number = 50;
    constructor(
        private readonly crmApiService: CrmApiService,
        @InjectRepository(CrmConfig)
        private crmConfigRepository: Repository<CrmConfig>,
        @InjectRepository(CrmUsers)
        private crmUsersRepository: Repository<CrmUsers>,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async syncCrmUserID() {
        const crmConfig = await this.crmConfigRepository.find();

        if (!!crmConfig) return;

        await this.updateOrAddCrmUsersInfo(crmConfig[0], this.startPage);
    }

    private async updateOrAddCrmUsersInfo(crmConfig: CrmConfig, startPage: number): Promise<void> {
        const crmUsers = await this.crmApiService.getActiveUsers(crmConfig, startPage);

        const next = crmUsers?.next;

        await this._updateCrmUsersInfo(crmUsers);

        if (next) {
            this.updateOrAddCrmUsersInfo(crmConfig, startPage + this.addToNextPage);
        }
    }

    private async _updateCrmUsersInfo(crmUsers: BitirxUserGet): Promise<void> {
        await Promise.all(
            crmUsers.result.map(async (user) => {
                await this.crmUsersRepository.upsert(
                    {
                        pbxExtension: Number(user.UF_PHONE_INNER),
                        crmUserId: Number(user.ID),
                    },
                    ['pbxExtension'],
                );
            }),
        );
    }
}
