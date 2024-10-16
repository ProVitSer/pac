import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import Ari from 'ari-client';
import { AriProvider } from '../interfaces/ari.enum';
import { AsteriskOriginateResult } from '../../../interfaces/asterisk.interface';
import { AriOriginateData } from '../interfaces/ari.interface';
import { ARI_ORIGINATE_ERROR } from '../ari.constants';

@Injectable()
export class AriService {
    constructor(
        @Inject(AriProvider.call)
        private readonly ariCall: {
            ariClient: Ari.Client;
        },
        @Inject(AriProvider.info)
        private readonly ariInfo: {
            ariClient: Ari.Client;
        },
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async sendAriCall(data: AriOriginateData): Promise<AsteriskOriginateResult> {
        const channel = this.ariCall.ariClient.Channel();

        try {
            const result = await channel.originate({
                ...data,
            });

            return { uniqueid: result.id };
        } catch (e) {
            this.logger.error(e);
            throw new Error(ARI_ORIGINATE_ERROR);
        }
    }

    public getAriChannels(): Ari.Channels {
        return this.ariInfo.ariClient.channels;
    }

    public async getAriChannelList(): Promise<Ari.Channel[]> {
        const channel = this.ariInfo.ariClient.Channel();

        return await channel.list();
    }

    public async getBridgeList(): Promise<Ari.Bridge[]> {
        const bridge = this.ariInfo.ariClient.Bridge();

        return await bridge.list();
    }

    public async getAriEndpoints(): Promise<Ari.Endpoints> {
        return this.ariInfo.ariClient.endpoints;
    }
}
