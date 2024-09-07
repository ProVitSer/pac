import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsteriskAmiEventProviderInterface, OutboundRegistrationDetailEventData } from '../interfaces/ami.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OutboundRegistrationDetailEvent implements AsteriskAmiEventProviderInterface {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
    ) {}

    async parseEvent(event: OutboundRegistrationDetailEventData): Promise<void> {
        try {
            await this.voipRepository.update({ trunk_id: event.outboundauth }, { trunk_status: event.status });
        } catch (e) {
            this.logger.error(event);
        }
    }
}
