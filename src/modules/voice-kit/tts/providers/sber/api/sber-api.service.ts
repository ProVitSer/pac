import { HttpService } from '@nestjs/axios';
import { SynthesisRequest } from '../interfaces/sber.interface';
import { SberTTSTokenService } from '../services/sber.token.service';
import * as https from 'https';
import { SberApiUrl } from '../interfaces/sber.enum';
import { catchError, firstValueFrom } from 'rxjs';
import { Readable } from 'stream';
import { AxiosError } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SberApiService {
    private httpsAgent: https.Agent;

    constructor(
        private readonly sberTokenService: SberTTSTokenService,
        private readonly httpService: HttpService,
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
                        throw e;
                    }),
                ),
        );
        return response.data;
    }

    private async getHeader() {
        const token = await this.sberTokenService.getAccessToken();

        if (!token) throw new Error('Token not found');

        return {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/text',
            },
        };
    }
}
