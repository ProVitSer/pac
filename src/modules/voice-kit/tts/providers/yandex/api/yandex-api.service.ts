import { HttpException, HttpStatus, Inject, Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { YandexSpeechDataAdapter } from '../adapters/yandex.adapter';
import { YandexSpeech } from '../interfaces/yandex.interface';
import { YandexTTSIAMTokenService } from '../services/yandex.iam.token.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class YandexTTSApiService {
    private readonly axios: AxiosInstance;
    private readonly iam: YandexTTSIAMTokenService;
    private readonly maxRetries = 5;

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly iamToken: YandexTTSIAMTokenService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        const axios = this.httpService.axiosRef;
        const iam = this.iamToken;
        const maxRetries = this.maxRetries;

        this.httpService.axiosRef.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async function (error: AxiosError) {
                const originalRequest = error.config as InternalAxiosRequestConfig & { _retryCount?: number };

                if (!originalRequest?._retryCount) {
                    originalRequest._retryCount = 0;
                }

                try {
                    if (error.response.status === HttpStatus.UNAUTHORIZED) {
                        originalRequest._retryCount += 1;

                        if (originalRequest._retryCount > maxRetries) {
                            return Promise.reject(error);
                        }

                        const iamToken = await iam.refreshIAMToken();

                        originalRequest.headers['Authorization'] = `Bearer ${iamToken}`;

                        return axios.request(originalRequest);
                    }
                } catch (e) {
                    return Promise.reject(error);
                }
                return Promise.reject(error);
            },
        );
    }

    public async request(dataAdapter: YandexSpeechDataAdapter): Promise<AxiosResponse> {
        try {
            return await this._request(dataAdapter);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    private async _request(dataAdapter: YandexSpeechDataAdapter): Promise<AxiosResponse> {
        const queryString = new URLSearchParams({ ...this.getRequestData(dataAdapter) }).toString();

        return await firstValueFrom(
            this.httpService.post(this.configService.get('voiceKit.tts.yandex.url'), queryString, await this.getHeader()).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
                    throw new HttpException(error.response.statusText, error.response.status);
                }),
            ),
        );
    }

    private getRequestData(dataAdapter: YandexSpeechDataAdapter): YandexSpeech {
        return {
            ...dataAdapter,
            folderId: this.configService.get('voiceKit.tts.yandex.folderId'),
        };
    }

    private async getHeader(): Promise<any> {
        const token = await this.iamToken.getIAMToken();

        return {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${token}`,
            },
            responseType: 'stream',
        };
    }
}
