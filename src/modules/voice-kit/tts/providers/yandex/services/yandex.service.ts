import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as uuid from 'uuid';
import { YandexSpeechDataAdapter } from '../adapters/yandex.adapter';
import { AxiosResponse } from 'axios';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { VoiceFileFormat } from '../../../interfaces/tts.enum';
import { TTSProviderVoiceFileData } from '../../../interfaces/tts.interface';
import { YandexTTSApiService } from '../api/yandex-api.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class YandexTTSService {
    private readonly voiceTmpDir: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly yandexTtsApiService: YandexTTSApiService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        this.voiceTmpDir = this.configService.get('voiceKit.tts.voiceTmpDir');
    }

    public async streamingSynthesize(dataAdapter: YandexSpeechDataAdapter): Promise<TTSProviderVoiceFileData> {
        try {
            const fileName = await this.getTTSFile(dataAdapter);

            return {
                fileName,
                generatedFileName: fileName.slice(0, fileName.lastIndexOf('.')),
                fullFilePath: this.voiceTmpDir,
                format: VoiceFileFormat.raw,
                sampleRateHertz: Number(dataAdapter.sampleRateHertz),
            };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    private async getTTSFile(dataAdapter: YandexSpeechDataAdapter): Promise<string> {
        try {
            const fileName = `yandex-${uuid.v4()}.${VoiceFileFormat.raw}`;

            const response = await this.yandexTtsApiService.request(dataAdapter);

            await this.writeStreamVoiceFile(response, fileName);

            return fileName;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    private async writeStreamVoiceFile(response: AxiosResponse, fileName: string): Promise<boolean> {
        const writer = await FileUtilsService.writeStreamVoiceFile(fileName, this.voiceTmpDir);

        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;

            writer.on('error', (err) => {
                this.logger.error(err);

                error = err;

                writer.close();

                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
            });
        });
    }
}
