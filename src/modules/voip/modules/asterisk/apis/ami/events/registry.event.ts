import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsteriskAmiEventProviderInterface, RegistryEventData } from '../interfaces/ami.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PsRegistrations } from '../../../entities/ps-registrations.entity';
import { TrunkRegistryStatus } from '@app/modules/voip/interfaces/voip.enum';

@Injectable()
export class RegistryEvent implements AsteriskAmiEventProviderInterface {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
        @InjectRepository(PsRegistrations)
        private psRegistrations: Repository<PsRegistrations>,
    ) {}

    async parseEvent(event: RegistryEventData): Promise<void> {
        try {
            if (event?.username) {
                const psRegistrations = await this.psRegistrations.findOne({ where: { client_uri: event?.username } });

                if (!psRegistrations) return;

                await this.voipRepository.update(
                    { trunk_id: psRegistrations.id },
                    { trunk_status: event.status as unknown as TrunkRegistryStatus },
                );
            }
        } catch (e) {
            this.logger.error(event);
        }
    }
}
