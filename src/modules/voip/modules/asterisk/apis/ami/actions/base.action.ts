import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AmiListenter } from '../listenter/ami.listenter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class BaseAction {
    constructor(
        private readonly amiListenter: AmiListenter,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async sendAction<T>(action: any): Promise<T> {
        try {
            this.logger.log(`[AMI ACTION] ` + action);

            return await new Promise((resolve) => {
                this.amiListenter.client.send(action, (event: T) => {
                    resolve(event);
                });
            });
        } catch (e) {
            this.logger.error(e);

            throw e;
        }
    }
}
