import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { catchError, firstValueFrom } from 'rxjs';
import {
    CheckBalanceParams,
    CheckBalanceResponse,
    SmscCheckSmsStatusParams,
    SmscCheckSmsStatusResponse,
    SmscSendSmsData,
    SmscSendSmsResponse,
} from '../interfaces/sms.interface';
import { ResponseFormat, SmscApiUrl } from '../interfaces/sms.enum';
import { AxiosError } from 'axios';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SmscApiService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async sendSms(data: SmscSendSmsData): Promise<SmscSendSmsResponse> {
        const response = await firstValueFrom(
            this.httpService
                .post(SmscApiUrl.send, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
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

    public async checkSmsStatus(data: SmscCheckSmsStatusParams): Promise<SmscCheckSmsStatusResponse> {
        const response = await firstValueFrom(
            this.httpService
                .get(SmscApiUrl.status, {
                    params: {
                        ...data,
                    },
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

    public async checkBalance(data: CheckBalanceParams): Promise<CheckBalanceResponse> {
        const response = await firstValueFrom(
            this.httpService
                .get(SmscApiUrl.balance, {
                    params: {
                        login: data.login,
                        psw: data.psw,
                        fmt: ResponseFormat.json,
                    },
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
}
