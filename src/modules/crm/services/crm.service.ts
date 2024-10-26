import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { CrmApiService } from './crm-api.service';
import {
    BitrixTasksFields,
    CrmCallData,
    MissedCallToCrmData,
    OnExternalCallStart,
    RegisterCallInfo,
    SearchClientByPhoneResult,
} from '../interfaces/crm.interface';
import { CrmConfigService } from './crm-config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrmUsers } from '../entities/crm-users.entity';
import { CrmConfig } from '../entities/crm-config.entity';
import { format, addMinutes, formatISO, parseISO, addHours } from 'date-fns';
import { CallDirection } from '@app/modules/call-event-handler/interfaces/call-event-handler.enum';
import { BitrixCallStatusType, BitrixCallType } from '../interfaces/crm.enum';
import { BitrixCallFinishDataAdapter } from '../adapters/bitrix-call-finish-data.adapter';
import { BitrixRegisterCallDataAdapter } from '../adapters/bitrix-register-call-data.adapter';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { VoipService } from '@app/modules/voip/services/voip.service';

@Injectable()
export class CrmService {
    constructor(
        private readonly crmConfigService: CrmConfigService,
        private readonly crmApiService: CrmApiService,
        @InjectRepository(CrmUsers)
        private crmUsersRepository: Repository<CrmUsers>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly voipService: VoipService,
        @InjectRepository(CrmConfig)
        private crmConfigRepository: Repository<CrmConfig>,
    ) {}

    public async addCallToCrm(data: CrmCallData): Promise<void> {
        try {
            switch (data.callDireciton) {
                case CallDirection.incoming:
                    return await this.sendInfoByIncomingCall(data);

                case CallDirection.outgoing:
                    return await this.sendInfoByOutgoingCall(data);

                default:
                    break;
            }
        } catch (e) {
            this.logger.error(e);
            return;
        }
    }

    public async searchClientByPhone(clientId: number, phone: string): Promise<SearchClientByPhoneResult> {
        const crmConfig = await this.crmConfigService.getCrmConfig(clientId);

        if (!crmConfig) return;

        const searchData = {
            select: ['ID', 'NAME', 'LAST_NAME', 'ASSIGNED_BY_ID'],
            filter: {
                PHONE: phone,
            },
        };

        return await this.crmApiService.searchContact(crmConfig, searchData);
    }

    public async addMissedCallToCrm(data: MissedCallToCrmData): Promise<void> {
        const crmConfig = await this.crmConfigService.getCrmConfig(data.clientId);

        if (!crmConfig) return;

        const crmUser = data?.extension ? await this.getBitrixUserID(crmConfig, Number(data?.extension)) : crmConfig.adminId;

        const taskData: BitrixTasksFields = {
            fields: {
                TITLE: 'Пропущенный вызов',
                RESPONSIBLE_ID: crmUser || crmConfig.adminId,
                CREATED_BY: crmConfig.userTaskId,
                DESCRIPTION: `Пропущенный вызов от абонента ${data.externalNumber} по номеру ${data.trunkName}`,
                PRIORITY: '2',
                GROUP_ID: crmConfig.taskGroup,
                ...(crmConfig?.deadlineMin
                    ? { DEADLINE: format(addMinutes(new Date(), crmConfig.deadlineMin), 'yyyy-MM-dd H:mm:ss') }
                    : {}),
            },
        };

        await this.createTask(crmConfig, taskData);
    }

    private async sendInfoByIncomingCall(data: CrmCallData): Promise<void> {
        const crmConfig = await this.crmConfigService.getCrmConfig(data.clientId);

        const crmUser = data?.fullCallInfo.isDstInUsers
            ? await this.getBitrixUserID(crmConfig, Number(data?.fullCallInfo.dstDn))
            : crmConfig.adminId;

        const callData: RegisterCallInfo = {
            crmUserId: crmUser,
            phoneNumber: data.fullCallInfo.srcCallerNumber,
            calltype: BitrixCallType.incoming,
            startCall: formatISO(addHours(parseISO(data?.fullCallInfo.startTime), 12)),
            billsec: String(data.fullCallInfo.callTime),
            bitrixCallStatusType: data.fullCallInfo.callAnswered ? BitrixCallStatusType.SuccessfulCall : BitrixCallStatusType.MissedCall,
            recording: data.fullCallInfo.dstRecordingUrl,
        };

        await this.registerCall(crmConfig, callData);
    }

    private async sendInfoByOutgoingCall(data: CrmCallData): Promise<void> {
        const crmConfig = await this.crmConfigService.getCrmConfig(data.clientId);

        const crmUser = data?.fullCallInfo.isDstInUsers
            ? await this.getBitrixUserID(crmConfig, Number(data?.fullCallInfo.srcDn))
            : crmConfig.adminId;

        const callData: RegisterCallInfo = {
            crmUserId: crmUser,
            phoneNumber: data.fullCallInfo.dstCallerNumber,
            calltype: BitrixCallType.outgoing,
            startCall: formatISO(addHours(parseISO(data?.fullCallInfo.startTime), 12)),
            billsec: String(data.fullCallInfo.callTime),
            bitrixCallStatusType: data.fullCallInfo.callAnswered ? BitrixCallStatusType.SuccessfulCall : BitrixCallStatusType.MissedCall,
            recording: data.fullCallInfo.dstRecordingUrl,
        };

        await this.registerCall(crmConfig, callData);
    }

    private async registerCall(crmConfig: CrmConfig, callInfo: RegisterCallInfo): Promise<void> {
        const extenralCall = await this.crmApiService.externalCallRegister(
            crmConfig,
            new BitrixRegisterCallDataAdapter(String(callInfo.crmUserId), callInfo.phoneNumber, callInfo.calltype, callInfo.startCall),
        );

        const dataAdapter = new BitrixCallFinishDataAdapter(extenralCall.result.CALL_ID, String(callInfo.crmUserId), callInfo);

        await this.crmApiService.externalCallFinish(crmConfig, dataAdapter);

        if (dataAdapter.attachRecordData.RECORD_URL) {
            const attachResult = await this.crmApiService.attachCallRecord(
                crmConfig,
                dataAdapter.attachRecordData.CALL_ID,
                dataAdapter.attachRecordData.FILENAME,
            );

            await this.crmApiService.uploadCallRecord(
                dataAdapter.attachRecordData.FILENAME,
                dataAdapter.attachRecordData.RECORD_URL,
                attachResult.result.uploadUrl,
            );
        }
    }

    private async createTask(crmConfig: CrmConfig, taskData: BitrixTasksFields): Promise<void> {
        await this.crmApiService.createTask(crmConfig, taskData);
    }

    private async getBitrixUserID(crmConfig: CrmConfig, pbxExtension: number): Promise<number> {
        const crmUser = await this.crmUsersRepository.findOne({ where: { pbxExtension } });

        if (crmUser) return crmUser.crmUserId;

        return crmConfig.adminId;
    }

    public async getPbxExtensionByCrmId(crmUserId: number): Promise<CrmUsers> {
        return await this.crmUsersRepository.findOne({ where: { crmUserId } });
    }

    public async crmInitCall(data: OnExternalCallStart): Promise<void> {
        const crmConfig = await this.crmConfigRepository.findOne({
            where: {
                token: data.auth.application_token,
            },
        });

        if (crmConfig.token !== data.auth.application_token) return;

        const crmUser = await this.getPbxExtensionByCrmId(Number(data.data.USER_ID));

        if (!crmUser) return;

        await this.voipService.makeExternalCall(crmConfig.clientId, data.data.PHONE_NUMBER, String(crmUser.pbxExtension));
    }
}
