import { Injectable, OnApplicationBootstrap, Inject, LoggerService } from '@nestjs/common';
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
import { AsteriskEventType, AsteriskUnionEventData } from '../interfaces/ami.enum';
import { AsteriskAmiEventProviderInterface, AsteriskAmiEventProviders } from '../interfaces/ami.interface';
import { NewChannelEvent } from '../events/new-channel.event';
import { HangupEvent } from '../events/hangup.event';
import { RegistryEvent } from '../events/registry.event';
import { VarSetEvent } from '../events/var-set.event';
import { OutboundRegistrationDetailEvent } from '../events/outbound-registration-detail.event';

@Injectable()
export class AmiListenter implements OnApplicationBootstrap {
    private amiClient: any;
    constructor(
        @Inject(configuration().voip.asterisk.ami.providerName) private readonly ami: any,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly newChannel: NewChannelEvent,
        private readonly varSet: VarSetEvent,
        private readonly registry: RegistryEvent,
        private readonly hangup: HangupEvent,
        private readonly outboundRegistrationDetail: OutboundRegistrationDetailEvent,
    ) {}

    private get providers(): AsteriskAmiEventProviders {
        return {
            [AsteriskEventType.Hangup]: this.hangup,
            [AsteriskEventType.Registry]: this.registry,
            [AsteriskEventType.VarSet]: this.varSet,
            [AsteriskEventType.Newchannel]: this.newChannel,
            [AsteriskEventType.OutboundRegistrationDetail]: this.outboundRegistrationDetail,
        };
    }

    public get client() {
        return this.amiClient;
    }

    async onApplicationBootstrap() {
        try {
            this.amiClient = await this.ami;

            this.amiClient.logLevel = configuration().voip.asterisk.ami.logLevel;

            this.amiClient.open();

            this.amiClient.on('namiConnected', () => this.logger.log(AMI_CONNECT_SUCCESS));

            this.amiClient.on('namiConnectionClose', () => this.connectionClose(this.amiClient));

            this.amiClient.on('namiLoginIncorrect', () => this.loginIncorrect());

            this.amiClient.on('namiInvalidPeer', () => this.invalidPeer());

            this.amiClient.on(`namiEvent${AsteriskEventType.Hangup}` as AsteriskEventType, (event: AsteriskUnionEventData) =>
                this.parseNamiEvent(event.event, event),
            );

            this.amiClient.on(`namiEvent${AsteriskEventType.Registry}` as AsteriskEventType, (event: AsteriskUnionEventData) =>
                this.parseNamiEvent(event.event, event),
            );

            this.amiClient.on(`namiEvent${AsteriskEventType.VarSet}`, (event: AsteriskUnionEventData) =>
                this.parseNamiEvent(event.event, event),
            );

            this.amiClient.on(`namiEvent${AsteriskEventType.Newchannel}` as AsteriskEventType, (event: AsteriskUnionEventData) =>
                this.parseNamiEvent(event.event, event),
            );
            this.amiClient.on(
                `namiEvent${AsteriskEventType.OutboundRegistrationDetail}` as AsteriskEventType,
                (event: AsteriskUnionEventData) => this.parseNamiEvent(event.event, event),
            );
        } catch (e) {
            this.logger.error(`${ERROR_AMI}: ${e}`);
        }
    }

    private parseNamiEvent(eventType: AsteriskEventType, eventData: AsteriskUnionEventData): Promise<void> {
        try {
            const provider = this.getProvider(eventType);
            return provider.parseEvent(eventData);
        } catch (e) {
            this.logger.error(e);
        }
    }

    private getProvider(eventType: AsteriskEventType): AsteriskAmiEventProviderInterface {
        if (this.providerExists(eventType)) {
            return this.providers[eventType];
        }
        throw new Error('Event provider not exists');
    }

    private providerExists(eventType: AsteriskEventType): boolean {
        return eventType in this.providers;
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
