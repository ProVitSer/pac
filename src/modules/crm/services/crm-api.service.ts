import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CrmConfig } from '../entities/crm-config.entity';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { ActiveUser, BitrixMetod } from '../interfaces/crm.enum';
import { HttpService } from '@nestjs/axios';
import {
    BitirxUserGet,
    BitrixAttachRecordResult,
    BitrixFinishCallFields,
    BitrixRegisterCallResponse,
    BitrixTasksFields,
    CreateTaskResponse,
    SearchClientByPhoneResult,
    SearchContactData,
} from '../interfaces/crm.interface';
import { BitrixRegisterCallDataAdapter } from '../adapters/bitrix-register-call-data.adapter';
import { BitrixCallFinishDataAdapter } from '../adapters/bitrix-call-finish-data.adapter';
import * as FormData from 'form-data';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class CrmApiService {
    constructor(
        private readonly httpService: HttpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async checkConnectToCrm(domain: string, hash: string, userId: number): Promise<BitirxUserGet> {
        const data = {
            FILTER: {
                ACTIVE: ActiveUser.active,
            },
        };

        this.logger.log(JSON.stringify(data));

        const response = await firstValueFrom(
            this.httpService.post(`${domain}/${hash}/${BitrixMetod.UserGet}?ID=${userId}`, data).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
                    throw error;
                }),
            ),
        );

        return response.data;
    }

    public async createTask(crmConfig: CrmConfig, taskData: BitrixTasksFields): Promise<CreateTaskResponse> {
        this.logger.log(JSON.stringify(taskData));

        const response = await firstValueFrom(
            this.httpService.post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.TaskAdd}`, taskData).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
                    throw error;
                }),
            ),
        );

        return response.data;
    }

    public async getActiveUsers(crmConfig: CrmConfig, startPage: number): Promise<BitirxUserGet> {
        const data = {
            FILTER: {
                ACTIVE: ActiveUser.active,
            },
        };

        this.logger.log(JSON.stringify(data));

        const response = await firstValueFrom(
            this.httpService.post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.UserGet}?start=${startPage}`, data).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
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
        this.logger.log(JSON.stringify(dataAdapter.registerCallData));

        const response = await firstValueFrom(
            this.httpService
                .post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ExternalCallRegister}`, { ...dataAdapter.registerCallData })
                .pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(error);
                        throw error;
                    }),
                ),
        );

        return response.data;
    }

    public async externalCallFinish(crmConfig: CrmConfig, dataAdapter: BitrixCallFinishDataAdapter): Promise<BitrixFinishCallFields> {
        this.logger.log(JSON.stringify(dataAdapter.finishData));

        const response = await firstValueFrom(
            this.httpService
                .post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ExternalCallFinish}`, { ...dataAdapter.finishData })
                .pipe(
                    catchError((error: AxiosError) => {
                        this.logger.error(error);
                        throw error;
                    }),
                ),
        );

        return response.data;
    }

    public async attachCallRecord(crmConfig: CrmConfig, crmCallId: string, filename: string): Promise<BitrixAttachRecordResult> {
        this.logger.log(JSON.stringify({ CALL_ID: crmCallId, FILENAME: filename }));

        const response = await firstValueFrom(
            this.httpService
                .post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ExternalCallAttachRecord}`, {
                    CALL_ID: crmCallId,
                    FILENAME: filename,
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

    public async uploadCallRecord(filename: string, fileUrl: string, uploadUrl: string): Promise<BitrixAttachRecordResult> {
        this.logger.log(JSON.stringify({ fileUrl, uploadUrl }));

        const fileResponse = await firstValueFrom(
            this.httpService.get(fileUrl, {
                responseType: 'stream',
            }),
        );

        const form = new FormData();

        form.append('file', fileResponse.data, filename);

        const formHeaders = form.getHeaders();

        const response = await firstValueFrom(
            this.httpService
                .post(uploadUrl, form, {
                    headers: {
                        ...formHeaders,
                        'Content-Type': `multipart/form-data; boundary=${form.getBoundary()}`,
                    },
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

    public async searchContact(crmConfig: CrmConfig, searchData: SearchContactData): Promise<SearchClientByPhoneResult> {
        this.logger.log(JSON.stringify({ searchData }));

        const response = await firstValueFrom(
            this.httpService.post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ContactList}`, { ...searchData }).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
                    throw error;
                }),
            ),
        );

        return response.data;
    }

    public async addContact(crmConfig: CrmConfig, number: string): Promise<void> {
        const params = {
            'fields[NAME]': 'Неизвестный Абонент',
            'fields[PHONE][0][VALUE]': number,
        };

        this.logger.log(JSON.stringify(params));

        const response = await firstValueFrom(
            this.httpService.get(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.AddContact}`, { params }).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
                    throw error;
                }),
            ),
        );

        return response.data;
    }
}
