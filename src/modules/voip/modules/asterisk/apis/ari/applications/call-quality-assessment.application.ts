import { Inject, Injectable, LoggerService, OnApplicationBootstrap } from '@nestjs/common';
import { AriProvider } from '../interfaces/ari.enum';
import Ari, { Channel, ChannelDtmfReceived, Playback, PlaybackStarted, StasisStart } from 'ari-client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CallQualityAssessmentApplication implements OnApplicationBootstrap {
    constructor(
        @Inject(AriProvider.call)
        private readonly ariCall: {
            ariClient: Ari.Client;
        },
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async onApplicationBootstrap() {
        this.ariCall.ariClient.on('StasisStart', async (event: StasisStart, incoming: Channel) => {
            try {
                this.logger.log(`Подключение к каналу оценки качества  ${JSON.stringify(event)}`);

                await this.handleCall(incoming);

                return;
            } catch (e) {
                this.logger.error(e);
            }
        });

        this.ariCall.ariClient.start('ari-call');
    }

    private async handleCall(incomingChannel: Channel): Promise<void> {
        await incomingChannel.answer();

        await this.playSound(incomingChannel, 'sound:agent-pass');

        return await new Promise(async (resolve: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            incomingChannel.on('ChannelDtmfReceived', async (event: ChannelDtmfReceived, _channel: Channel) => {
                const digit = event.digit;
                console.log('ChannelDtmfReceived', digit);
                resolve();
            });
        });
    }

    private async playSound(incomingChannel: Channel, sound: string): Promise<void> {
        try {
            await new Promise(async (resolve: any) => {
                const playback = this.ariCall.ariClient.Playback();

                const play = await incomingChannel.play(
                    {
                        media: sound,
                    },
                    playback,
                );

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                play.once('PlaybackFinished', async (event: PlaybackStarted, _: Playback) => {
                    resolve(event);
                });
            });
        } catch (e) {
            throw e;
        }
    }
}
