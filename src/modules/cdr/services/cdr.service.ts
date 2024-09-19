import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Cdr } from '../entities/cdr.entity';
import { GetCdrFiltersDto } from '../dto/get-cdr-filters.dto';
import { ApplicationServiceType } from '@app/common/interfaces/enums';

@Injectable()
export class CdrService {
    constructor(
        @InjectRepository(Cdr)
        private readonly cdrRepository: Repository<Cdr>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async getCdrs(): Promise<Cdr[]> {
        return this.cdrRepository.find({});
    }

    public async getCdrByClientId(clientId: number): Promise<Cdr[]> {
        return this.cdrRepository.find({
            where: {
                clientId: String(clientId),
            },
        });
    }

    public async getCdrByUniq(uniqueid: string): Promise<Cdr> {
        return this.cdrRepository.findOne({
            where: {
                uniqueid,
            },
        });
    }

    public async getCdrByTrunkType(applicationServiceType: ApplicationServiceType): Promise<Cdr[]> {
        return this.cdrRepository.find({
            where: {
                applicationServiceType,
            },
        });
    }

    public async getFilteredCdr(filters: GetCdrFiltersDto): Promise<Cdr[]> {
        const queryFilters = {};

        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                queryFilters[key] = value;
            }
        }

        return this.cdrRepository.find({ where: queryFilters });
    }
}
