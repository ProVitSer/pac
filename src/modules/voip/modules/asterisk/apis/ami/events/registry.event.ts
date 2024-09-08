import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsteriskAmiEventProviderInterface, RegistryEventData } from '../interfaces/ami.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PsRegistrations } from '../../../entities/ps-registrations.entity';
import { TrunkRegistryStatus } from '@app/modules/voip/interfaces/voip.enum';
import { NotificationsService } from '@app/modules/notifications/services/notifications.service';
import { CHANGE_TRUNK_REGISTER_STATUS_DESCRIPTION_BY_STATUS, TRUNK_STATUS_DESCRIPTRION } from '../ami.constants';
import { UtilsService } from '@app/common/utils/utils.service';

@Injectable()
export class RegistryEvent implements AsteriskAmiEventProviderInterface {
    delays = [3000, 3500, 4000, 4500, 5000, 5500, 10000];

    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
        @InjectRepository(PsRegistrations)
        private psRegistrations: Repository<PsRegistrations>,
        private readonly notificationsService: NotificationsService,
        private dataSource: DataSource,
    ) {}

    async parseEvent(event: RegistryEventData): Promise<void> {
        try {
            if (event?.username) {
                await UtilsService.randomDelayTimer(this.delays);

                const psRegistrations = await this.psRegistrations.findOne({ where: { clientUri: event?.username } });

                if (!psRegistrations) return;

                const voip = await this.voipRepository.findOne({ where: { trunkId: psRegistrations.id }, relations: { client: true } });

                await this.updateStatus(event, psRegistrations);

                await this.sendNotification(event, voip);
            }
        } catch (e) {
            this.logger.error(event);
        }
    }

    private async sendNotification(event: RegistryEventData, voip: Voip): Promise<void> {
        if (voip.trunkStatus !== (event.status as unknown as TrunkRegistryStatus)) {
            await this.notificationsService.changeTrunkStatusNotification({
                client: voip.client,
                trinkId: event?.username,
                subject: TRUNK_STATUS_DESCRIPTRION,
                trunkStatusDescription: CHANGE_TRUNK_REGISTER_STATUS_DESCRIPTION_BY_STATUS[event.status],
            });
        }
    }

    private async updateStatus(event: RegistryEventData, psRegistrations: PsRegistrations) {
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();

        await queryRunner.startTransaction();

        await this.voipRepository.update({ trunkId: psRegistrations.id }, { trunkStatus: event.status as unknown as TrunkRegistryStatus });

        await queryRunner.commitTransaction();

        await queryRunner.release();
    }
}
