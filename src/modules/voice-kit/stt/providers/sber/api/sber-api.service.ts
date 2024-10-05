import { HttpService } from '@nestjs/axios';
import {
    DownloadVoiceFailData,
    RecognizeResultData,
    SberGetRecognizeTaskResult,
    SberSetRecognizeTaskOptionsRequest,
    SberSetRecognizeTaskResult,
    SberSTTUploadResult,
} from '../interfaces/sber.interface';
import { SberSTTTokenService } from '../services/sber.token.service';
import * as https from 'https';
import { SberSTTApiUrl } from '../interfaces/sber.enum';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { AxiosError } from 'axios';

@Injectable()
export class SberSTTApiService {
    private httpsAgent: https.Agent;

    constructor(
        private readonly sberTokenService: SberSTTTokenService,
        private readonly httpService: HttpService,
    ) {
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }

    public async upload(data: DownloadVoiceFailData): Promise<SberSTTUploadResult> {
        const fileStream = fs.createReadStream(data.fullFilePathName);

        try {
            const response = await lastValueFrom(
                this.httpService.post(SberSTTApiUrl.uploadVoice, fileStream, {
                    headers: {
                        'Content-Type': 'audio/wave',
                        Authorization: `Bearer ${await this.getToken()}`,
                    },
                    httpsAgent: this.httpsAgent,
                }),
            );
            return response.data;
        } catch (e) {
            console.error('Error sending audio file:', e.message);
            throw e;
        }
    }

    public async speechAsyncRecognize(data: SberSetRecognizeTaskOptionsRequest): Promise<SberSetRecognizeTaskResult> {
        try {
            const response = await firstValueFrom(
                this.httpService
                    .post(SberSTTApiUrl.setRecognizeTask, data, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${await this.getToken()}`,
                        },
                        httpsAgent: this.httpsAgent,
                    })
                    .pipe(
                        catchError((e: AxiosError) => {
                            throw e;
                        }),
                    ),
            );

            return response.data;
        } catch (e) {
            console.error('Error speech async recognize:', e.message);
            throw e;
        }
    }

    public async taskGet(id: string): Promise<SberGetRecognizeTaskResult> {
        try {
            const response = await firstValueFrom(
                this.httpService
                    .get(SberSTTApiUrl.getRecognizeTaskStatus, {
                        params: {
                            id,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${await this.getToken()}`,
                        },
                        httpsAgent: this.httpsAgent,
                    })
                    .pipe(
                        catchError((e: AxiosError) => {
                            throw e;
                        }),
                    ),
            );

            return response.data;
        } catch (e) {
            console.error('Error task Get:', e.message);
            throw e;
        }
    }

    public async download(response_file_id: string): Promise<RecognizeResultData> {
        try {
            console.log(response_file_id);
            const response = await firstValueFrom(
                this.httpService
                    .get(SberSTTApiUrl.downloadRecognizeRezule, {
                        params: {
                            response_file_id,
                        },
                        headers: {
                            Authorization: `Bearer ${await this.getToken()}`,
                        },
                        httpsAgent: this.httpsAgent,
                    })
                    .pipe(
                        catchError((e: AxiosError) => {
                            console.log(e);
                            throw e;
                        }),
                    ),
            );
            console.log(response);
            return response.data;
        } catch (e) {
            console.error('Error download', e.message);
            throw e;
        }
    }

    private async getToken(): Promise<string> {
        const token = await this.sberTokenService.getAccessToken();

        if (!token) throw new Error('Token not found');

        return token;
    }
}
