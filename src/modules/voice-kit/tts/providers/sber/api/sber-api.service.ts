import { HttpService } from '@nestjs/axios';
import { SynthesisRequest } from '../interfaces/sber.interface';
import { SberTTSTokenService } from '../services/sber.token.service';
import * as https from 'https';
import { SberApiUrl } from '../interfaces/sber.enum';
import { catchError, firstValueFrom } from 'rxjs';
import { Readable } from 'stream';
import { AxiosError } from 'axios';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SberApiService {
    private httpsAgent: https.Agent;

    constructor(
        private readonly sberTokenService: SberTTSTokenService,
        private readonly httpService: HttpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {
        this.httpsAgent = new https.Agent({
            rejectUnauthorized: false,
        });
    }

    public async synthesize(synthesisRequestData: SynthesisRequest): Promise<Readable> {
        const response = await firstValueFrom(
            this.httpService
                .post(SberApiUrl.synthesize, synthesisRequestData.text, {
                    ...(await this.getHeader()),
                    httpsAgent: this.httpsAgent,
                    params: {
                        format: synthesisRequestData.audio_encoding,
                        voice: synthesisRequestData.voice,
                    },
                    responseType: 'stream',
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

    private async getHeader() {
        const token = await this.sberTokenService.getAccessToken();

        this.logger.error('Token not found');
        if (!token) throw new Error('Token not found');

        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/text',
            },
        };
    }
}
