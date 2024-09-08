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
        @Inject(AriProvider.call)
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

        const soundFile = await this.filesService.getFilesByClientId(trunk.client.id);

        const cqaFile = soundFile.filter((s: Files) => s.applicationServiceType == ApplicationServiceType.cqa);

        if (!cqaFile && !cqaFile[0]) return;

        const soundPathFile = `sound:${cqaFile[0].path}/${cqaFile[0].generatedFilePath}/${cqaFile[0].generatedFileName}`;

        await incomingChannel.answer();

        await this.playSound(incomingChannel, soundPathFile);

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
                        lang: 'ru',
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
