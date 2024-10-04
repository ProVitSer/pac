import { Injectable } from '@nestjs/common';
import { TTSProviderVoiceFileData, TTSConvertVoiceFileData } from '../interfaces/tts.interface';
import { TTSProviderType, VoiceFileFormat } from '../interfaces/tts.enum';
import { exec, ExecException } from 'child_process';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { promises as fsPromises } from 'fs';

@Injectable()
export class TTSConvertService {
    constructor(private readonly configService: ConfigService) {}

    public async convertTTSVoiceFileToWav(ttsType: TTSProviderType, data: TTSProviderVoiceFileData): Promise<TTSConvertVoiceFileData> {
        try {
            const wavFileName = `${data.generatedFileName}.${VoiceFileFormat.wav}`;

            const fullFilePath = await this.getFullConvertFilePath();

            await this._convertTTSVoiceFileToWav(data, `${fullFilePath}/${wavFileName}`);

            return {
                fileName: wavFileName,
                generatedFileName: data.generatedFileName,
                fullFilePath,
                format: VoiceFileFormat.wav,
            };
        } catch (e) {
            throw e;
        }
    }

    private async _convertTTSVoiceFileToWav(data: TTSProviderVoiceFileData, fullFile: string): Promise<void> {
        try {
            await new Promise((resolve, reject) => {
                exec(
                    `sox -r 8000 -b 16 -e signed-integer -c 1 ${data.fullFilePath}${data.fileName} ${fullFile}`,
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    (error: ExecException, stdout, stderr: string) => {
                        if (error) {
                            reject(error);
                        }
                        resolve(true);
                    },
                );
            });
        } catch (e) {
            throw e;
        }
    }

    private async getFullConvertFilePath(): Promise<string> {
        const now = new Date();

        const year = now.getFullYear();

        const month = String(now.getMonth() + 1).padStart(2, '0');

        const day = String(now.getDate()).padStart(2, '0');

        const folderPath = join(this.configService.get('voiceKit.tts.voiceFileDir'), `${year}`, `${month}`, `${day}`, '/');

        await fsPromises.mkdir(folderPath, { recursive: true });

        return folderPath;
    }
}
