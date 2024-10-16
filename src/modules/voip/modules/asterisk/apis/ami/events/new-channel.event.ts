import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AsteriskAmiEventProviderInterface, NewchannelEventData } from '../interfaces/ami.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class NewChannelEvent implements AsteriskAmiEventProviderInterface {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

    async parseEvent(event: NewchannelEventData): Promise<void> {
        try {
            return;
        } catch (e) {
            this.logger.error(event);
        }
    }
}
