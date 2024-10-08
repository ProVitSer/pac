import { Injectable } from '@nestjs/common';
import { CrmConfig } from '../entities/crm-config.entity';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { ActiveUser, BitrixMetod } from '../interfaces/crm.enum';
import { HttpService } from '@nestjs/axios';
import {
    BitirxUserGet,
    BitrixFinishCallFields,
    BitrixRegisterCallResponse,
    BitrixTasksFields,
    CreateTaskResponse,
    SearchContactData,
} from '../interfaces/crm.interface';
import { BitrixRegisterCallDataAdapter } from '../adapters/bitrix-register-call-data.adapter';
import { BitrixCallFinishDataAdapter } from '../adapters/bitrix-call-finish-data.adapter';

@Injectable()
export class CrmApiService {
    constructor(private readonly httpService: HttpService) {}

    public async checkConnectToCrm(domain: string, hash: string, userId: number): Promise<BitirxUserGet> {
        const data = {
            FILTER: {
                ACTIVE: ActiveUser.active,
            },
        };

        const response = await firstValueFrom(
            this.httpService.post(`${domain}/${hash}/${BitrixMetod.UserGet}?ID=${userId}`, data).pipe(
                catchError((error: AxiosError) => {
                    throw error;
                }),
            ),
        );

        return response.data;
    }

    public async createTask(crmConfig: CrmConfig, taskData: BitrixTasksFields): Promise<CreateTaskResponse> {
        const response = await firstValueFrom(
            this.httpService.post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.TaskAdd}`, taskData).pipe(
                catchError((error: AxiosError) => {
                    throw error;
                }),
            ),
        );

        return response.data;
    }

    public async getActiveUsers(crmConfig: CrmConfig, startPage: number): Promise<BitirxUserGet[]> {
        const data = {
            FILTER: {
                ACTIVE: ActiveUser.active,
            },
        };

        const response = await firstValueFrom(
            this.httpService.post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.UserGet}?start=${startPage}`, data).pipe(
                catchError((error: AxiosError) => {
                    throw error;
                }),
            ),
        );

        return response.data;
    }

    public async externalCallRegister(
        crmConfig: CrmConfig,
        dataAdapter: BitrixRegisterCallDataAdapter,
    ): Promise<BitrixRegisterCallResponse> {
        const response = await firstValueFrom(
            this.httpService
                .post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ExternalCallRegister}`, { ...dataAdapter.registerCallData })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );

        return response.data;
    }

    public async externalCallFinish(crmConfig: CrmConfig, dataAdapter: BitrixCallFinishDataAdapter): Promise<BitrixFinishCallFields> {
        const response = await firstValueFrom(
            this.httpService
                .post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ExternalCallFinish}`, { ...dataAdapter.finishData })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );

        return response.data;
    }

    public async attachRecord(crmConfig: CrmConfig, dataAdapter: BitrixCallFinishDataAdapter): Promise<BitrixFinishCallFields> {
        const response = await firstValueFrom(
            this.httpService
                .post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ExternalCallAttachRecord}`, { ...dataAdapter.attachRecordData })
                .pipe(
                    catchError((error: AxiosError) => {
                        throw error;
                    }),
                ),
        );

        return response.data;
    }

    public async searchContact(crmConfig: CrmConfig, searchData: SearchContactData): Promise<any> {
        const response = await firstValueFrom(
            this.httpService.post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ContactList}`, searchData).pipe(
                catchError((error: AxiosError) => {
                    throw error;
                }),
            ),
        );

        return response.data;
    }
}
