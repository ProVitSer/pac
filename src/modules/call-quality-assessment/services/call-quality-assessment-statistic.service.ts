import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallQualityAssessmentStatistic } from '../entities/call-quality-assessment-statistic.entity';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CallQualityAssessmentConfigService } from './call-quality-assessment-config.service';
import {
    AddInitStaticInfo,
    CqaStatisticData,
    GetCqaStatisticQuery,
    GetCqaStatisticResult,
    UpdateStatisticInfoData,
} from '../interfaces/call-quality-assessment.interface';
import { CallQualityAssessmentConfig } from '../entities/call-quality-assessment.-config.entity';
import { format } from 'date-fns';

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

            const cqac = await this.getCqacConfig(voip.client.clientId);

            const cqas = this.cqas.create();

            cqas.uniqueid = data.uniqueid;

            cqas.clientId = voip.client.clientId;

            cqas.callQualityAssessmentConfig = cqac;

            await this.cqas.save(cqas);
        } catch (e) {
            this.logger.error(e);

            return e;
        }
    }

    public async updateStatistic(data: UpdateStatisticInfoData): Promise<void> {
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

    public async getCqaStatistic(query: GetCqaStatisticQuery): Promise<GetCqaStatisticResult> {
        const parsePage = parseInt(query.page || '1');

        const parsePageSize = parseInt(query.pageSize || '10');

        const searchDate = query.dateString || null; //format(new Date(), 'yyyy-MM-dd');

        const queryBuilder = this.cqas
            .createQueryBuilder('call_quality_assessment_statistic')
            .orderBy('call_quality_assessment_statistic.id', 'DESC');

        if (searchDate) {
            queryBuilder.where('DATE(call_quality_assessment_statistic.createdAt) = :searchDate', { searchDate });
        }

        if (query.managerNumber) {
            queryBuilder.andWhere('call_quality_assessment_statistic.managerNumber LIKE :managerNumber', {
                managerNumber: `%${query.managerNumber}%`,
            });
        }

        const totalRecords = await queryBuilder.getCount();

        const cqaStatistic = await queryBuilder
            .skip((parsePage - 1) * parsePageSize)
            .take(parsePageSize)
            .getMany();

        const formattedCqaStatistic: CqaStatisticData[] = [];

        cqaStatistic.map((cqa: CallQualityAssessmentStatistic) =>
            formattedCqaStatistic.push({
                rating: String(cqa.rating) || '',
                callResult: cqa.callResult,
                clientNumber: cqa.clientNumber || '',
                managerData: cqa.managerData || '',
                managerNumber: cqa.managerNumber || '',
                country: cqa.country || '',
                region: cqa.region || '',
                city: cqa.city || '',
                date: format(new Date(cqa.createdAt), 'yyyy-MM-dd'),
            }),
        );

        return {
            data: formattedCqaStatistic,
            totalRecords: totalRecords || 0,
        };
    }
}
