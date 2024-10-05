import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { YandexSpeechDataAdapter } from '../adapters/yandex.adapter';
import { YandexSpeech } from '../interfaces/yandex.interface';
import { YandexTTSIAMTokenService } from '../services/yandex.iam.token.service';

@Injectable()
export class YandexTTSApiService {
    private readonly axios: AxiosInstance;
    private readonly iam: YandexTTSIAMTokenService;
    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService,
        private readonly iamToken: YandexTTSIAMTokenService,
    ) {
        const axios = this.httpService.axiosRef;
        const iam = this.iamToken;
        this.httpService.axiosRef.interceptors.response.use(
            (response: AxiosResponse) => {
                return response;
            },
            async function (error: AxiosError) {
                const originalRequest = error.config;

                try {
                    if (error.response.status === HttpStatus.UNAUTHORIZED) {
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
            throw e;
        }
    }

    private async _request(dataAdapter: YandexSpeechDataAdapter): Promise<AxiosResponse> {
        const queryString = new URLSearchParams({ ...this.getRequestData(dataAdapter) }).toString();

        return await firstValueFrom(
            this.httpService.post(this.configService.get('voiceKit.tts.yandex.url'), queryString, await this.getHeader()).pipe(
                catchError((error: AxiosError) => {
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
