import { Inject, Injectable, LoggerService, OnApplicationBootstrap } from '@nestjs/common';
import { AriProvider } from '../../voip/modules/asterisk/apis/ari/interfaces/ari.enum';
import Ari, { Channel, ChannelDtmfReceived, Playback, PlaybackStarted, StasisStart } from 'ari-client';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { CHANNEL_NAME_REGEXP } from '../../voip/modules/asterisk/apis/ari/ari.constants';
import { FilesService } from '@app/modules/files/services/files.service';
import { Voip } from '@app/modules/voip/entities/voip.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallQualitySound } from '../interfaces/call-quality-assessment..interface';
import { CallQualityAssessmentConfigService } from '../services/call-quality-assessment-config.service';
import { CallQualityAssessmentConfig } from '../entities/call-quality-assessment.-config.entity';
import { CallResult, CqaFileType } from '../interfaces/call-quality-assessment..enum';
import { CallQualityAssessmentStatisticService } from '../services/call-quality-assessment-statistic.service';

@Injectable()
export class CallQualityAssessmentApplication implements OnApplicationBootstrap {
    private readonly soundRuPath: string = 'ru';
    constructor(
        @Inject(AriProvider.cqa)
        private readonly ariCall: {
            ariClient: Ari.Client;
        },
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        @InjectRepository(Voip)
        private voipRepository: Repository<Voip>,
        private readonly filesService: FilesService,
        private readonly cqac: CallQualityAssessmentConfigService,
        private readonly cqas: CallQualityAssessmentStatisticService,
    ) {}

    public async onApplicationBootstrap() {
        this.ariCall.ariClient.on('StasisStart', async (event: StasisStart, incoming: Channel) => {
            try {
                this.logger.log(`Подключение к каналу оценки качества  ${JSON.stringify(event)}`);

                const match = event.channel.name.match(CHANNEL_NAME_REGEXP);

                if (!match && !match[1]) return incoming.hangup();

                this.cqas.addCqasStatistic({ uniqueid: event.channel.id, clientNumber: event.channel.caller.name, trunkId: match[1] });

                await this.handleCall(event, incoming, match[1]);

                return incoming.hangup();
            } catch (e) {
                incoming.hangup();

                this.cqas.updateStatistic({ uniqueid: event.channel.id, callResult: CallResult.unsuccessful });

                this.logger.error(e);
            }
        });

        this.ariCall.ariClient.start('ari-call');
    }

    private async handleCall(event: StasisStart, incomingChannel: Channel, trunkId: string): Promise<void> {
        const trunk = await this.getTrunkData(trunkId);

        const cqac = await this.getCqacConfig(trunk.client.id);

        const callQualitySound = await this.getCallQualitySound(cqac);

        await incomingChannel.answer();

        // await this.onCallEvent(incomingChannel, cqac);

        const rating = await this.playCallQualitySound(incomingChannel, callQualitySound);

        this.cqas.updateStatistic({ uniqueid: event.channel.id, callResult: CallResult.successful, rating: Number(rating) });

        await this.playGoodbye(incomingChannel, callQualitySound);
    }

    // private async onCallEvent(incomingChannel: Channel, cqac: CallQualityAssessmentConfig) {
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     incomingChannel.on('ChannelHangupRequest', (_event: ChannelHangupRequest, _channel: Channel) => {
    //         // TODO отправка в очередь информацию о завершение вызова с последующей выгрузки из PBX
    //     });
    // }

    private async playCallQualitySound(incomingChannel: Channel, callQualitySounds: CallQualitySound[]): Promise<string> {
        const cqaMainSound = callQualitySounds.find((c) => c.cqaFileType === CqaFileType.cqaMain);

        if (!cqaMainSound) return;

        return await new Promise<string>(async (resolve) => {
            const playback = this.ariCall.ariClient.Playback();

            const play = await incomingChannel.play(
                {
                    media: cqaMainSound.sound,
                    lang: this.soundRuPath,
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
    }

    private async playGoodbye(incomingChannel: Channel, callQualitySounds: CallQualitySound[]): Promise<void> {
        const cqaGoodbyeSound = callQualitySounds.find((c) => c.cqaFileType === CqaFileType.cqaGoodbye);

        await new Promise<void>(async (resolve) => {
            const playback = this.ariCall.ariClient.Playback();

            const play = await incomingChannel.play(
                {
                    media: cqaGoodbyeSound?.sound || `sound:goodbye`,
                    lang: this.soundRuPath,
                },
                playback,
            );

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            play.once('PlaybackFinished', async (event: PlaybackStarted, _: Playback) => {
                resolve();
            });
        });
    }

    private async getTrunkData(trunkId: string): Promise<Voip> {
        const trunk = await this.voipRepository.findOne({ where: { trunkId }, relations: { client: true } });

        if (!trunk) throw new Error('Trunk not found');

        return trunk;
    }

    private async getCqacConfig(clientId: number): Promise<CallQualityAssessmentConfig> {
        const cqac = await this.cqac.getCqaConfig(clientId);

        if (!cqac) throw new Error('Cqac not found');

        return cqac;
    }

    private async getCallQualitySound(cqac: CallQualityAssessmentConfig): Promise<CallQualitySound[]> {
        const callQualitySounds = await this._getCallQualitySound(cqac);

        if (!callQualitySounds) throw new Error('Cqac sounds not found');

        return callQualitySounds;
    }

    private async _getCallQualitySound(cqac: CallQualityAssessmentConfig): Promise<CallQualitySound[]> {
        const callQualitySound: CallQualitySound[] = [];

        for (const file of cqac.audioFiles) {
            const soundFile = await this.filesService.getFile(file.fileId);

            if (soundFile) {
                callQualitySound.push({
                    sound: `sound:${soundFile.path}/${soundFile.generatedFilePath}/${soundFile.generatedFileName}`.replace('.wav', ''),
                    cqaFileType: file.cqaFileType,
                });
            }
        }

        return callQualitySound;
    }
}
