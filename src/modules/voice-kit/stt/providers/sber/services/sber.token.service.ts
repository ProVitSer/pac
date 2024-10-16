import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, LoggerService, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { SberSTTApiUrl, SberScope } from '../interfaces/sber.enum';
import * as uuid from 'uuid';
import { stringify } from 'qs';
import { SberTokenResponse } from '../interfaces/sber.interface';
import { getTime } from 'date-fns';
import { VoiceKitTtsSberEnvironmentVariables } from '@app/common/config/interfaces/config.interface';
import * as https from 'https';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SberSTTTokenService implements OnModuleInit {
    private accessToken: string;
    private accessTokenExpiresAt: number;
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

    async onModuleInit() {
        const tokenData = await this._getAccessToken();

        this.accessToken = tokenData.access_token;

        this.accessTokenExpiresAt = tokenData.expires_at;
    }

    public async getAccessToken() {
        if (this.checkTokenExpires()) {
            const tokenData = await this._getAccessToken();

            this.updateTokenData(tokenData);

            return tokenData.access_token;
        }
        return this.accessToken;
    }

    private updateTokenData(tokenData: SberTokenResponse) {
        this.accessToken = tokenData.access_token;

        this.accessTokenExpiresAt = tokenData.expires_at;
    }

    private checkTokenExpires(): boolean {
        return this.accessTokenExpiresAt <= getTime(new Date());
    }

    private async _getAccessToken(): Promise<SberTokenResponse> {
        const response = await firstValueFrom(
            this.httpService
                .post<SberTokenResponse>(SberSTTApiUrl.token, this.getTokenRequestData(), {
                    ...this.getTokenHeader(),
                    httpsAgent: this.httpsAgent,
                })
                .pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(error);
                        throw error;
                    }),
                ),
        );
        return response.data;
    }

    private getTokenRequestData() {
        return stringify({ scope: SberScope.personal });
    }

    private getTokenHeader() {
        const { accessToken } = this.configService.get('voiceKit.stt.sber') as VoiceKitTtsSberEnvironmentVariables;

        return {
            headers: {
                Authorization: `Basic ${accessToken}`,
                RqUID: uuid.v4(),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
    }
}
