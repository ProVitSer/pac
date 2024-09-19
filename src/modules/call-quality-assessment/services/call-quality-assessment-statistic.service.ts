import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallQualityAssessmentStatistic } from '../entities/call-quality-assessment-statistic.entity';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CallQualityAssessmentConfigService } from './call-quality-assessment-config.service';
import { AddInitStaticInfo, UpdateStatisticInfoData } from '../interfaces/call-quality-assessment.interface';
import { CallQualityAssessmentConfig } from '../entities/call-quality-assessment.-config.entity';

@Injectable()
export class CallQualityAssessmentStatisticService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        @InjectRepository(CallQualityAssessmentStatistic)
        private cqas: Repository<CallQualityAssessmentStatistic>,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
        private readonly cqac: CallQualityAssessmentConfigService,
    ) {}

    public async addCqasStatistic(data: AddInitStaticInfo): Promise<void> {
        try {
            const voip = await this.getTrunkData(data.trunkId);

            const cqac = await this.getCqacConfig(voip.client.id);

            const cqas = this.cqas.create();

            cqas.uniqueid = data.uniqueid;

            cqas.clientNumber = data.clientNumber;

            cqas.client = voip.client;

            cqas.callQualityAssessmentConfig = cqac;

            await this.cqas.save(cqas);
        } catch (e) {
            this.logger.error(e);

            return e;
        }
    }

    public async updateStatistic(data: UpdateStatisticInfoData) {
        const { uniqueid, ...statistcUpdateData } = data;

        await this.cqas.update({ uniqueid }, { ...statistcUpdateData });
    }

    private async getTrunkData(trunkId: string): Promise<Voip> {
        const trunk = await this.voipRepository.findOne({ where: { trunkId }, relations: { client: true } });

        if (!trunk) throw new Error('Trunk not found');

        return trunk;
    }

    private async getCqacConfig(clientId: number): Promise<CallQualityAssessmentConfig> {
        const cqac = await this.cqac.getCqaConfig(clientId);

        if (!cqac) throw new Error('Cqac not found');

        return cqac;
    }
}
