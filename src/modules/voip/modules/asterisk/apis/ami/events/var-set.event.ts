import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsteriskAmiEventProviderInterface, VarSetEventData } from '../interfaces/ami.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class VarSetEvent implements AsteriskAmiEventProviderInterface {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

    async parseEvent(event: VarSetEventData): Promise<void> {
        try {
        } catch (e) {
            this.logger.error(event);
        }
    }
}
