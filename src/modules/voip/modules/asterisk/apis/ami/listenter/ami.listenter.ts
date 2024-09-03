import { Injectable, OnApplicationBootstrap, Inject, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import configuration from '@app/common/config/config.provider';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import {
    AMI_CONNECT_SUCCESS,
    AMI_INCORRECT_LOGIN,
    AMI_RECONECT,
    DEFAULT_REOPEN_AMI_CLIENT,
    ERROR_AMI,
    INVALIDE_PEER,
} from '../ami.constants';

@Injectable()
export class AmiListenter implements OnApplicationBootstrap {
    constructor(
        @Inject(configuration().voip.asterisk.ami.providerName) private readonly ami: any,
        private readonly configService: ConfigService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    async onApplicationBootstrap() {
        try {
            const amiClient = await this.ami;

            amiClient.logLevel = configuration().voip.asterisk.ami.logLevel;

            amiClient.open();

            amiClient.on('namiConnected', () => this.logger.log(AMI_CONNECT_SUCCESS));

            amiClient.on('namiConnectionClose', () => this.connectionClose(amiClient));

            amiClient.on('namiLoginIncorrect', () => this.loginIncorrect());

            amiClient.on('namiInvalidPeer', () => this.invalidPeer());

            amiClient.on('*', (event: any) => console.log(event));
        } catch (e) {
            this.logger.error(`${ERROR_AMI}: ${e}`);
        }
    }

    private connectionClose(amiClient: any): void {
        this.logger.error(AMI_RECONECT);

        setTimeout(() => {
            amiClient.open();
        }, DEFAULT_REOPEN_AMI_CLIENT);
    }

    private loginIncorrect(): void {
        this.logger.error(AMI_INCORRECT_LOGIN);
        process.exit(1);
    }

    private invalidPeer(): void {
        this.logger.error(INVALIDE_PEER);
        process.exit(1);
    }
}
