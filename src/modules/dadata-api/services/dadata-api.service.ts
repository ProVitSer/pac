import { Injectable } from '@nestjs/common';
import { ApiURL, DADATA_API_MAP } from '../dadata-api.constants';
import { DadataRequestQuery, DadataRequestQueryParams, DadataResponse } from '../interfaces/dadata-api.interface';
import { PlainObject } from '@app/common/interfaces/interfaces';
import { HttpService } from '@nestjs/axios';
import { DadataAllObj } from '../interfaces/dadata-api.type';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class DadataApiService {
    constructor(private readonly dadataAPI: HttpService) {}

    public async getDadataInfo<T extends DadataAllObj>(requestData: DadataRequestQueryParams): Promise<T> {
        try {
            if (!requestData.query) {
                throw Error('Отсутствует значения для поиска');
            }
            return await this.send<T>(requestData);
        } catch (e) {
            throw e;
        }
    }

    private async send<T>(requestData: DadataRequestQueryParams): Promise<T> {
        const url = this.getApiUrl(requestData);
        console.log(url);

        const response = await firstValueFrom(
            this.dadataAPI.post(`${url}${requestData.type}`, this.formarQuery(url, requestData), { baseURL: url }).pipe(
                catchError((e: AxiosError) => {
                    console.log(e);

                    throw e;
                }),
            ),
        );

        return this.parseResponse(response.data) as T;
    }

    private formarQuery(url: ApiURL, requestData: DadataRequestQueryParams): PlainObject | string {
        switch (url) {
            case ApiURL.suggestions:
                return { query: (requestData.query as DadataRequestQuery).value, ...requestData.params };
            case ApiURL.geolocate:
                const query = JSON.stringify({ ...(requestData.query as DadataRequestQuery), ...requestData.params });
                return query;
            case ApiURL.cleaner:
                return [requestData.query];
            default:
                throw Error(`Отсутствует форматирование запроса по данному URL: ${url}`);
        }
    }

    private parseResponse(data: PlainObject): PlainObject {
        return 'suggestions' in data ? this.formatResponse(data.suggestions) : data;
    }

    private formatResponse(data: DadataResponse[]): PlainObject {
        const formatResponse: Array<any> = [];
        data.map((d: DadataResponse) => {
            const copy = Object.assign({}, d.data);
            copy.selected = d.value;
            copy.value = d.unrestricted_value || d.value;
            formatResponse.push(copy);
        });
        return formatResponse;
    }

    private getApiUrl(requestData: DadataRequestQuery): ApiURL {
        if (requestData.type in DADATA_API_MAP[requestData.suggestions]) {
            return DADATA_API_MAP[requestData.suggestions][requestData.type];
        } else {
            throw Error(`Не найден ${requestData.type} API Dadata`);
        }
    }
}
