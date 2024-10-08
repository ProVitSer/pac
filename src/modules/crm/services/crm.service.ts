import { Injectable } from '@nestjs/common';
import { CrmApiService } from './crm-api.service';
import { BitrixTasksFields, MissedCallToCrmData, RegisterCallInfo } from '../interfaces/crm.interface';
import { CrmConfigService } from './crm-config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmUsers } from '../entities/crm-users.entity';
import { CrmConfig } from '../entities/crm-config.entity';
import { format, addMinutes } from 'date-fns';
import { CallAnaliticsData } from '@app/modules/call-analytics/interfaces/call-analytics.interface';
import { CallDirection } from '@app/modules/call-event-handler/interfaces/call-event-handler.enum';

@Injectable()
export class CrmService {
    constructor(
        private readonly crmConfigService: CrmConfigService,
        private readonly crmApiService: CrmApiService,
        @InjectRepository(CrmUsers)
        private crmUsersRepository: Repository<CrmUsers>,
    ) {}

    public async addCallToCrm(data: CallAnaliticsData): Promise<void> {
        switch (data.callDireciton) {
            case CallDirection.incoming:
                return await this.sendInfoByIncomingCall(data);

            case CallDirection.outgoing:
                return await this.sendInfoByOutgoingCall(data);

            default:
                break;
        }
    }

    public async searchClientByPhone(clientId: number, phone: string): Promise<any> {
        const crmConfig = await this.crmConfigService.getCrmConfig(clientId);

        if (!crmConfig) return;

        const searchData = {
            filter: {
                PHONE: phone,
            },
        };

        return await this.crmApiService.searchContact(crmConfig, searchData);
    }

    public async addMissedCallToCrm(data: MissedCallToCrmData): Promise<void> {
        const crmConfig = await this.crmConfigService.getCrmConfig(data.clientId);

        if (!crmConfig) return;

        const crmUser = data?.extension ? await this.getBitrixUserID(crmConfig, data?.extension) : crmConfig.adminId;

        const taskData: BitrixTasksFields = {
            fields: {
                TITLE: 'Пропущенный вызов',
                RESPONSIBLE_ID: crmUser || crmConfig.adminId,
                CREATED_BY: crmConfig.userTaskId,
                DESCRIPTION: `Пропущенный вызов от абонента ${data.externalNumber}`,
                PRIORITY: '2',
                GROUP_ID: crmConfig.taskGroup,
                ...(crmConfig?.daedlineMin
                    ? { DEADLINE: format(addMinutes(new Date(), crmConfig.daedlineMin), 'yyyy-MM-dd H:mm:ss') }
                    : {}),
            },
        };

        await this.createTask(crmConfig, taskData);
    }

    private async sendInfoByIncomingCall(data: CallAnaliticsData): Promise<void> {
        const crmConfig = await this.crmConfigService.getCrmConfig(data.clientId);
    }

    private async sendInfoByOutgoingCall(data: CallAnaliticsData): Promise<void> {}

    private async registerCall(crmConfig: CrmConfig, callInfo: RegisterCallInfo): Promise<void> {}

    private async createTask(crmConfig: CrmConfig, taskData: BitrixTasksFields): Promise<void> {
        await this.crmApiService.createTask(crmConfig, taskData);
    }

    private async getBitrixUserID(crmConfig: CrmConfig, pbxExtension: string): Promise<number> {
        const crmUser = await this.crmUsersRepository.findOne({ where: { pbxExtension } });

        if (crmUser) return crmUser.crmUserId;

        return crmConfig.adminId;
    }
}
