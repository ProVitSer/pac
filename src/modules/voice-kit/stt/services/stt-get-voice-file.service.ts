import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import * as https from 'https';
import { catchError, firstValueFrom } from 'rxjs';
import * as uuid from 'uuid';
import { GetVoiceFileDataResult } from '../interfaces/stt.interface';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { Readable } from 'stream';

@Injectable()
export class SttGetVoiceFileService {
    private httpsAgent: https.Agent;
    private readonly voiceTmpDir: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {
        this.voiceTmpDir = this.configService.get('voiceKit.stt.voiceTmpDir');
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }

    public async getVoiceFile(recordingUrl: string): Promise<GetVoiceFileDataResult> {
        try {
            const voiceFile = await this.downloadVoiceFile(recordingUrl);

            const fileName = `${uuid.v4()}.wav`;

            await this.writeStreamVoiceFile(voiceFile, fileName);

            return {
                fileName,
                generatedFileName: fileName.slice(0, fileName.lastIndexOf('.')),
                fullFilePath: this.voiceTmpDir,
            };
        } catch (e) {
            throw e;
        }
    }

    private async downloadVoiceFile(recordingUrl: string) {
        const response = await firstValueFrom(
            this.httpService
                .get(recordingUrl, {
                    responseType: 'stream',
                    httpsAgent: this.httpsAgent,
                })
                .pipe(
                    catchError((e: AxiosError) => {
                        throw e;
                    }),
                ),
        );
        return response.data;
    }

    private async writeStreamVoiceFile(streamingResponse: Readable, fileName: string) {
        const writer = await FileUtilsService.writeStreamVoiceFile(fileName, this.voiceTmpDir);

        await new Promise((resolve, reject) => {
            streamingResponse.on('data', (chunk) => {
                writer.write(chunk);
            });

            streamingResponse.on('end', () => {
                writer.end();
                resolve(true);
            });

            streamingResponse.on('error', (error: any) => {
                console.error('Stream error:', error);
                reject(error);
            });
        });
    }
}
