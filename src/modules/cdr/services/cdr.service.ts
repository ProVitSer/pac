import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Cdr } from '../entities/cdr.entity';
import { TrunkType } from '@app/modules/voip/interfaces/voip.enum';
import { GetCdrFiltersDto } from '../dto/get-cdr-filters.dto';

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
                client_id: String(clientId),
            },
        });
    }

    public async getCdrByTrunkType(trunkType: TrunkType): Promise<Cdr[]> {
        return this.cdrRepository.find({
            where: {
                trunk_type: trunkType,
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
