import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmConfig } from '../entities/crm-config.entity';
import { CrmApiService } from './crm-api.service';
import AddCrmConfig from '../dto/add-crm-config.dto';
import UpdateCrmConfig from '../dto/update-crm-config.dto';

@Injectable()
export class CrmConfigService {
    constructor(
        @InjectRepository(CrmConfig)
        private crmConfigRepository: Repository<CrmConfig>,
        private readonly crmApiService: CrmApiService,
    ) {}

    public async addCrmConfig(clientId: number, crmConfig: AddCrmConfig): Promise<void> {
        try {
            await this.crmApiService.checkConnectToCrm(crmConfig.domain, crmConfig.hash, crmConfig.adminId);
        } catch (e) {
            throw new Error('Connect to Crm error');
        }

        const config = this.crmConfigRepository.create();

        config.clientId = clientId;
        config.domain = crmConfig.domain;
        config.hash = crmConfig.hash;
        config.adminId = crmConfig.adminId;
        config.daedlineMin = crmConfig.daedlineMin || null;
        config.userTaskId = crmConfig.userTaskId || null;
        config.taskGroup = crmConfig.taskGroup || null;

        await this.crmConfigRepository.save(config);
    }

    public async getCrmConfig(clientId: number): Promise<CrmConfig> {
        return await this.crmConfigRepository.findOne({ where: { clientId } });
    }

    public async deleteCrmConfig(clientId: number): Promise<void> {
        await this.crmConfigRepository.delete({ clientId });
    }

    public async updateCrmConfig(clientId: number, updateData: UpdateCrmConfig): Promise<void> {
        const crmConfig = await this.crmConfigRepository.findOne({ where: { clientId } });

        if (!crmConfig) throw new Error('Crm config not found');

        if (updateData?.domain && updateData?.hash) {
            const domain = updateData?.domain ? updateData.domain : crmConfig.domain;

            const hash = updateData?.hash ? updateData.hash : crmConfig.hash;

            try {
                await this.crmApiService.checkConnectToCrm(domain, hash, crmConfig.adminId);
            } catch (e) {
                throw new Error('Connect to Crm error');
            }
        }

        await this.crmConfigRepository.update({ id: crmConfig.id }, { ...updateData });
    }
}
