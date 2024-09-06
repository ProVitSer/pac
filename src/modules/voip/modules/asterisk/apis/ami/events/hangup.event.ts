import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsteriskAmiEventProviderInterface, HangupEventData } from '../interfaces/ami.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class HangupEvent implements AsteriskAmiEventProviderInterface {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

    async parseEvent(event: HangupEventData): Promise<void> {
        try {
            console.log('HangupEvent', event);
        } catch (e) {
            this.logger.error(event);
        }
    }
}
