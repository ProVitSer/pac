import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SberSpeechDataAdapter } from '../adapters/sber.adapter';
import * as uuid from 'uuid';
import { SberGRPCClient } from '../grpc/sber.grpc.client';
import { TTSProviderVoiceFileData } from '../../../interfaces/tts.interface';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { VoiceFileFormat } from '../../../interfaces/tts.enum';

@Injectable()
export class SberService {
    private readonly voicePath: string;
    constructor(
        private readonly configService: ConfigService,
        private readonly sberGRPCClient: SberGRPCClient,
    ) {
        this.voicePath = this.configService.get('voiceKit.tts.voiceFileDir');
    }

    public async streamingSynthesize(dataAdapter: SberSpeechDataAdapter): Promise<TTSProviderVoiceFileData> {
        try {
            const ttsClient = await this.sberGRPCClient.createTtsClient();

            const ttsStreamingCall = ttsClient.Synthesize({ ...dataAdapter.synthesisRequestData });

            const fileName = `sber-${uuid.v4()}.${VoiceFileFormat.raw}`;

            await this.writeStreamVoiceFile(ttsStreamingCall, ttsClient, fileName);

            return {
                fileName,
                generatedFileName: fileName.slice(0, fileName.lastIndexOf('.')),
                fullFilePath: FileUtilsService.getFullPath(this.voicePath),
                format: VoiceFileFormat.raw,
                sampleRateHertz: dataAdapter.sampleRateHertz,
            };
        } catch (e) {
            throw e;
        }
    }

    private async writeStreamVoiceFile(ttsStreamingResponse: any, ttsClient: any, fileName: string) {
        const writer = await FileUtilsService.writeStreamVoiceFile(fileName, this.voicePath);

        await new Promise((resolve, reject) => {
            ttsStreamingResponse.on('status', (status) => {
                if (status.code !== 0) reject(status);
            });

            ttsStreamingResponse.on('end', () => {
                resolve(true);
                ttsClient.close();
            });

            ttsStreamingResponse.on('error', (error: any) => {
                reject(error);
            });
            ttsStreamingResponse.on('data', (response: any) => {
                if (response && response.data) {
                    writer.write(Buffer.from(response.data));
                }
            });
        });
    }
}
