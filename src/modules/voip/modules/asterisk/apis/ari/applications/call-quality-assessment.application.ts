import { Inject, Injectable, LoggerService, OnApplicationBootstrap } from '@nestjs/common';
import { AriProvider } from '../interfaces/ari.enum';
import Ari, { Channel, ChannelDtmfReceived, Playback, PlaybackStarted, StasisStart } from 'ari-client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CHANNEL_NAME_REGEXP } from '../ari.constants';
import { FilesService } from '@app/modules/files/services/files.service';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Files } from '@app/modules/files/entities/files.entity';
import { ApplicationServiceType } from '@app/common/interfaces/enums';

@Injectable()
export class CallQualityAssessmentApplication implements OnApplicationBootstrap {
    constructor(
        @Inject(AriProvider.cqa)
        private readonly ariCall: {
            ariClient: Ari.Client;
        },
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
        private readonly filesService: FilesService,
    ) {}

    public async onApplicationBootstrap() {
        this.ariCall.ariClient.on('StasisStart', async (event: StasisStart, incoming: Channel) => {
            try {
                this.logger.log(`Подключение к каналу оценки качества  ${JSON.stringify(event)}`);

                await this.handleCall(event, incoming);

                return;
            } catch (e) {
                this.logger.error(e);
            }
        });

        this.ariCall.ariClient.start('ari-call');
    }

    private async handleCall(event: StasisStart, incomingChannel: Channel): Promise<void> {
        const match = event.channel.name.match(CHANNEL_NAME_REGEXP);

        if (!match && !match[1]) return;

        const trunk = await this.voipRepository.findOne({ where: { trunkId: match[1] }, relations: { client: true } });

        if (!trunk) return;

        const callQualitySound = await this.getCallQualitySound(trunk.client.id);

        await incomingChannel.answer();

        const rating = await this.playCallQualitySound(incomingChannel, callQualitySound);

        await this.playGoodbye(incomingChannel);

        return incomingChannel.hangup();
    }

    private async getCallQualitySound(clientId: number): Promise<string> {
        const soundFile = await this.filesService.getFilesByClientId(clientId);

        const cqaFile = soundFile.filter((s: Files) => s.applicationServiceType == ApplicationServiceType.cqa);

        if (!cqaFile && !cqaFile[0]) return;

        return `sound:${cqaFile[0].path}/${cqaFile[0].generatedFilePath}/${cqaFile[0].generatedFileName}`.replace('.wav', '');
    }

    private async playCallQualitySound(incomingChannel: Channel, sound: string): Promise<string> {
        try {
            return await new Promise(async (resolve) => {
                const playback = this.ariCall.ariClient.Playback();

                const play = await incomingChannel.play(
                    {
                        media: sound,
                        lang: 'ru',
                    },
                    playback,
                );

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                incomingChannel.on('ChannelDtmfReceived', async (event: ChannelDtmfReceived, _channel: Channel) => {
                    await play.stop();
                    resolve(event.digit);
                });

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                play.once('PlaybackFinished', async (event: PlaybackStarted, _: Playback) => {
                    resolve('0');
                });
            });
        } catch (e) {
            this.logger.error(e);

            return;
        }
    }

    private async playGoodbye(incomingChannel: Channel): Promise<string> {
        try {
            await new Promise(async (resolve) => {
                const playback = this.ariCall.ariClient.Playback();

                const play = await incomingChannel.play(
                    {
                        media: `sound:goodbye`,
                        lang: 'en',
                    },
                    playback,
                );
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                play.once('PlaybackFinished', async (event: PlaybackStarted, _: Playback) => {
                    resolve(event);
                });
            });
        } catch (e) {
            this.logger.error(e);

            return;
        }
    }
}
