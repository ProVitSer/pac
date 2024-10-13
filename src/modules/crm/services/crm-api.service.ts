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
        const response = await firstValueFrom(
            this.httpService.post(`${crmConfig.domain}/${crmConfig.hash}/${BitrixMetod.ContactList}`, searchData).pipe(
                catchError((error: AxiosError) => {
                    this.logger.error(error);
                    throw error;
                }),
            ),
        );

        return response.data;
    }
}
