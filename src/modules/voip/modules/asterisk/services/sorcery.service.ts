import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DataSource, Repository } from 'typeorm';
import { Extensions } from '../entities/extensions.entity';
import { PsAors } from '../entities/ps-aors.entity';
import { PsAuths } from '../entities/ps-auths.entity';
import { PsEndpointIdIps } from '../entities/ps-endpointId-ips.entity';
import { PsEndpoints } from '../entities/ps-endpoints.entity';
import { PsRegistrations } from '../entities/ps-registrations.entity';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';
import { CREATE_TRUNK_ERROR } from '../asterisk.constants';
import TrunkExistsException from '../exceptions/trunk-exists.exeption';
import { PsAorsAdapter } from '../adapters/ps-aors.adapter';
import { PsAuthsAdapter } from '../adapters/ps-auths.adapter';
import { PsEndpointIdIpsAdapter } from '../adapters/ps-endpointId-ips.adapter';
import { PsRegistrationsAdapter } from '../adapters/ps-registrations.adapter';
import { PsEndpointsAdapter } from '../adapters/ps-endpoints.adapter';
import { CreateTrunkResult } from '@app/modules/voip/interfaces/voip.interface';

@Injectable()
export class SorceryService {
    constructor(
        private dataSource: DataSource,
        @InjectRepository(PsAors)
        private psAors: Repository<PsAors>,
        @InjectRepository(PsAuths)
        private psAuths: Repository<PsAuths>,
        @InjectRepository(PsEndpointIdIps)
        private psEndpointIdIps: Repository<PsEndpointIdIps>,
        @InjectRepository(PsRegistrations)
        private psRegistrations: Repository<PsRegistrations>,
        @InjectRepository(Extensions)
        private extensions: Repository<Extensions>,
        @InjectRepository(PsEndpoints)
        private psEndpoints: Repository<PsEndpoints>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async createTrunk(data: CreateTrunkDataWithTrunkId): Promise<CreateTrunkResult> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {
            await queryRunner.commitTransaction();

            const psAors = this.psAors.create(new PsAorsAdapter(data));

            await this.psAors.save(psAors);

            const psAuths = this.psAuths.create(new PsAuthsAdapter(data));

            await this.psAuths.save(psAuths);

            const psEndpointIdIps = this.psEndpointIdIps.create(new PsEndpointIdIpsAdapter(data));

            await this.psEndpointIdIps.save(psEndpointIdIps);

            const psRegistrations = this.psRegistrations.create(new PsRegistrationsAdapter(data));

            await this.psRegistrations.save(psRegistrations);

            const psEndpoints = this.psEndpoints.create(new PsEndpointsAdapter(data));

            await this.psEndpoints.save(psEndpoints);
        } catch (err) {
            await queryRunner.rollbackTransaction();

            this.logger.error(err);

            throw new Error(CREATE_TRUNK_ERROR);
        } finally {
            await queryRunner.release();
        }

        return { trinkId: data.trunkId };
    }

    public async findTrunkById(trunkId: string) {
        const trunk = await this.psEndpointIdIps.findOne({
            where: {
                id: trunkId,
            },
        });
        if (trunk) {
            throw new TrunkExistsException(trunkId);
        }
    }
}
