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
import { CreateTrunkDataWithTrunkId, TrunkData, UpdateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';
import { CREATE_TRUNK_ERROR } from '../asterisk.constants';
import { PsAorsAdapter } from '../adapters/ps-aors.adapter';
import { PsAuthsAdapter } from '../adapters/ps-auths.adapter';
import { PsEndpointIdIpsAdapter } from '../adapters/ps-endpointId-ips.adapter';
import { PsRegistrationsAdapter } from '../adapters/ps-registrations.adapter';
import { PsEndpointsAdapter } from '../adapters/ps-endpoints.adapter';
import { CreateTrunkResult, UpdateTrunkResult } from '@app/modules/voip/interfaces/voip.interface';

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

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();

            this.logger.error(err);

            throw new Error(CREATE_TRUNK_ERROR);
        } finally {
            await queryRunner.release();
        }

        return { trunkId: data.trunkId };
    }

    public async deleteTrunk(trunkId: string): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {
            await this.psAors.delete({ id: trunkId });

            await this.psAuths.delete({ id: trunkId });

            await this.psEndpointIdIps.delete({ id: trunkId });

            await this.psRegistrations.delete({ id: trunkId });

            await this.psEndpoints.delete({ id: trunkId });

            await queryRunner.commitTransaction();
        } catch (err) {
            await queryRunner.rollbackTransaction();

            this.logger.error(err);

            throw new Error(CREATE_TRUNK_ERROR);
        } finally {
            await queryRunner.release();
        }
    }

    public async updateTrunk(data: UpdateTrunkDataWithTrunkId): Promise<UpdateTrunkResult> {
        await this.deleteTrunk(data.originalTrunk.psAuths.id);

        await this.createTrunk({
            trunkId: data.trunkId,
            client: data.client,
            trunkType: data.voip.trunk_type,
            authId: data.authId ? data.authId : data.originalTrunk.psAuths.username,
            authPassword: data.authPassword ? data.authPassword : data.originalTrunk.psAuths.password,
            pbxIp: data.pbxIp ? data.pbxIp : data.originalTrunk.psEndpointIdIps.match,
        });

        return { trunkId: data.trunkId };
    }

    public async findTrunkById(trunkId: string): Promise<TrunkData> {
        const [psAuths, psAors, psEndpointIdIps, psRegistrations, psEndpoints] = await Promise.all([
            this.psAuths.findOne({ where: { id: trunkId } }),
            this.psAors.findOne({ where: { id: trunkId } }),
            this.psEndpointIdIps.findOne({ where: { id: trunkId } }),
            this.psRegistrations.findOne({ where: { id: trunkId } }),
            this.psEndpoints.findOne({ where: { id: trunkId } }),
        ]);

        return {
            psAors,
            psAuths,
            psEndpointIdIps,
            psRegistrations,
            psEndpoints,
        };
    }
}
