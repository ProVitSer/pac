import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsteriskAmiEventProviderInterface, RegistryEventData } from '../interfaces/ami.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class RegistryEvent implements AsteriskAmiEventProviderInterface {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

    async parseEvent(event: RegistryEventData): Promise<void> {
        try {
            console.log('RegistryEvent', event);
        } catch (e) {
            this.logger.error(event);
        }
    }
}
