import { HttpService } from '@nestjs/axios';
import {
    DownloadVoiceFailData,
    RecognizeResultDataResponse,
    SberGetRecognizeTaskResult,
    SberSetRecognizeTaskOptionsRequest,
    SberSetRecognizeTaskResult,
    SberSTTUploadResult,
} from '../interfaces/sber.interface';
import { SberSTTTokenService } from '../services/sber.token.service';
import * as https from 'https';
import { SberSTTApiUrl } from '../interfaces/sber.enum';
import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'fs';
import { AxiosError } from 'axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SberSTTApiService {
    private httpsAgent: https.Agent;

    constructor(
        private readonly sberTokenService: SberSTTTokenService,
        private readonly httpService: HttpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }

    public async upload(data: DownloadVoiceFailData): Promise<SberSTTUploadResult> {
        const fileStream = fs.createReadStream(data.fullFilePathName);

        const response = await lastValueFrom(
            this.httpService
                .post(SberSTTApiUrl.uploadVoice, fileStream, {
                    headers: {
                        'Content-Type': 'audio/wave',
                        Authorization: `Bearer ${await this.getToken()}`,
                    },
                    httpsAgent: this.httpsAgent,
                })
                .pipe(
                    catchError((e: AxiosError) => {
                        this.logger.error(e);
                        throw e;
                    }),
                ),
        );
        return response.data;
    }

    public async speechAsyncRecognize(data: SberSetRecognizeTaskOptionsRequest): Promise<SberSetRecognizeTaskResult> {
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
                        this.logger.error(e);
                        throw e;
                    }),
                ),
        );

        return response.data;
    }

    public async taskGet(id: string): Promise<SberGetRecognizeTaskResult> {
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
                        this.logger.error(e);
                        throw e;
                    }),
                ),
        );

        return response.data;
    }

    public async download(response_file_id: string): Promise<RecognizeResultDataResponse[]> {
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
                        this.logger.error(e);
                        throw e;
                    }),
                ),
        );
        return response.data;
    }

    private async getToken(): Promise<string> {
        const token = await this.sberTokenService.getAccessToken();

        this.logger.error('Token not found');
        if (!token) throw new Error('Token not found');

        return token;
    }
}
