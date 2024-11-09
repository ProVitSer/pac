import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosInstance, AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import {
    GetRecognizeTaskStatusResponse,
    RecognizeFileAsyncData,
    RecognizeFileAsyncResponse,
    RecognizeResultResponse,
} from '../interfaces/yandex.interface';
import { YandexSTTApiUrl } from '../interfaces/yandex.enum';
import * as https from 'https';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class YandexSTTApiService {
    private readonly axios: AxiosInstance;
    private readonly maxRetries = 5;
    private httpsAgent: https.Agent;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }

    public async recognizeFileAsync(data: RecognizeFileAsyncData): Promise<RecognizeFileAsyncResponse> {
        const response = await firstValueFrom(
            this.httpService
                .post(YandexSTTApiUrl.recognize, data, {
                    headers: {
                        Authorization: `Api-Key ${this.configService.get('voiceKit.stt.yandex.apiKey')}`,
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

    public async getRecognizeTaskStatus(operationId: string): Promise<GetRecognizeTaskStatusResponse> {
        const response = await firstValueFrom(
            this.httpService
                .get(`${YandexSTTApiUrl.getRecognizeTaskStatus}/${operationId}`, {
                    headers: {
                        Authorization: `Api-Key ${this.configService.get('voiceKit.stt.yandex.apiKey')}`,
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

    public async getRecognizeResult(operationId: string): Promise<RecognizeResultResponse[]> {
        const response = await firstValueFrom(
            this.httpService
                .get(`${YandexSTTApiUrl.getRecognizeResult}`, {
                    headers: {
                        Authorization: `Api-Key ${this.configService.get('voiceKit.stt.yandex.apiKey')}`,
                        'Content-Type': 'application/json',
                    },
                    params: {
                        operation_id: operationId,
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

        const jsonObjects = response.data.trim().split('\n');

        const parsedResults = jsonObjects.map((jsonStr) => {
            try {
                return JSON.parse(jsonStr);
            } catch (e) {
                this.logger.error(e);
                return null;
            }
        });

        return parsedResults.filter((result) => result !== null);
    }
}
