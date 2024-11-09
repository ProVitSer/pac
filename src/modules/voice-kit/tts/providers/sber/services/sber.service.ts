import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SberSpeechDataAdapter } from '../adapters/sber.adapter';
import * as uuid from 'uuid';
import { TTSProviderVoiceFileData } from '../../../interfaces/tts.interface';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { VoiceFileFormat } from '../../../interfaces/tts.enum';
import { SberApiService } from '../api/sber-api.service';
import { Readable } from 'stream';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SberTTSService {
    private readonly voiceTmpDir: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly sberApiService: SberApiService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        this.voiceTmpDir = this.configService.get('voiceKit.tts.voiceTmpDir');
    }

    public async streamingSynthesize(dataAdapter: SberSpeechDataAdapter): Promise<TTSProviderVoiceFileData> {
        try {
            const audioData = await this.sberApiService.synthesize({ ...dataAdapter.synthesisRequestData });

            const fileName = `sber-${uuid.v4()}.${VoiceFileFormat.raw}`;

            await this.writeStreamVoiceFile(audioData, fileName);

            return {
                fileName,
                generatedFileName: fileName.slice(0, fileName.lastIndexOf('.')),
                fullFilePath: this.voiceTmpDir,
                format: VoiceFileFormat.raw,
                sampleRateHertz: dataAdapter.sampleRateHertz,
            };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    private async writeStreamVoiceFile(ttsStreamingResponse: Readable, fileName: string) {
        const writer = await FileUtilsService.writeStreamVoiceFile(fileName, this.voiceTmpDir);

        await new Promise((resolve, reject) => {
            ttsStreamingResponse.on('data', (chunk) => {
                writer.write(chunk);
            });

            ttsStreamingResponse.on('end', () => {
                writer.end();
                resolve(true);
            });

            ttsStreamingResponse.on('error', (error: any) => {
                console.error('Stream error:', error);
                reject(error);
            });
        });
    }
}
