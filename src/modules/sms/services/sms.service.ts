import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sms } from '../entities/sms.entity';
import { CheckSmsStatus, GetSmsStatisticQuery, GetSmsStatisticResult, SmsData, SmsStatisticData } from '../interfaces/sms.interface';
import { SmsConfigService } from './sms-config.service';
import { SmscService } from './smsc.service';
import { SmscSendSmsResultAdapter } from '../adapters/smsc-send-sms-result.adapter';
import { format } from 'date-fns';

@Injectable()
export class SmsService {
    constructor(
        @InjectRepository(Sms)
        private smsRepository: Repository<Sms>,
        private readonly smsConfigService: SmsConfigService,
        private readonly smscService: SmscService,
    ) {}

    public async sendSms(data: SmsData) {
        const smsConfig = await this.smsConfigService.getSmsConfig(data.clientId);

        const sendingResult = await this.smscService.smsSending({
            externalNumber: data.externalNumber,
            sender: smsConfig.sender,
            smsText: data?.smsText || smsConfig.smsText,
            login: smsConfig.login,
            psw: smsConfig.psw,
        });
        await this.addSmsInfo(data, sendingResult);
    }

    public async checkSmsStatus(smsId: string): Promise<CheckSmsStatus> {
        const sms = await this.smsRepository.findOne({ where: { smsId } });

        if (!sms) throw new Error('Sms not found');

        const smsConfig = await this.smsConfigService.getSmsConfig(sms.clientId);

        const result = await this.smscService.checkStatusSendingSms({
            login: smsConfig.login,
            psw: smsConfig.psw,
            smsId: sms.smsId,
            phones: sms.number,
        });

        await this.updateSmsStstus(smsId, { smsSendStatus: result.smsSendStatus, smsSendResult: result.smsSendResult });

        return { smsSendStatus: result.smsSendStatus };
    }

    public async getSms(smsId: string): Promise<Sms> {
        return await this.smsRepository.findOne({ where: { smsId } });
    }

    private async updateSmsStstus(smsId: string, updateData: Partial<Sms>): Promise<void> {
        await this.smsRepository.update({ smsId }, { ...updateData });
    }

    private async addSmsInfo(data: SmsData, sendingResult: SmscSendSmsResultAdapter): Promise<void> {
        const sms = this.smsRepository.create();

        sms.smsId = sendingResult.smsId;
        sms.number = sendingResult.number;
        sms.smsText = sendingResult.smsText;
        sms.sender = sendingResult.sender;
        sms.clientId = data.clientId;
        sms.smsSendStatus = sendingResult.smsSendStatus;
        sms.smsSendResult = sendingResult.smsSendResult;

        await this.smsRepository.save(sms);
    }

    public async getSmsStatistic(query: GetSmsStatisticQuery): Promise<GetSmsStatisticResult> {
        const parsePage = parseInt(query.page || '1');

        const parsePageSize = parseInt(query.pageSize || '10');

        const searchDate = query.dateString || null; //format(new Date(), 'yyyy-MM-dd');

        const queryBuilder = this.smsRepository.createQueryBuilder('sms').orderBy('sms.id', 'DESC');

        if (searchDate) {
            queryBuilder.where('DATE(sms.createdAt) = :searchDate', { searchDate });
        }

        if (query.phoneNumber) {
            queryBuilder.andWhere('sms.number LIKE :phoneNumber', { phoneNumber: `%${query.phoneNumber}%` });
        }

        const totalRecords = await queryBuilder.getCount();

        const smsStatistics = await queryBuilder
            .skip((parsePage - 1) * parsePageSize)
            .take(parsePageSize)
            .getMany();

        const smsStatisticData: SmsStatisticData[] = [];

        smsStatistics.map((sms: Sms) =>
            smsStatisticData.push({
                smsId: sms.smsId,
                externalNumber: sms.number,
                smsText: sms.smsText,
                smsSendStatus: sms.smsSendStatus,
                smsSendResult: sms.smsSendResult,
                date: format(new Date(sms.createdAt), 'yyyy-MM-dd'),
            }),
        );

        return {
            data: smsStatisticData,
            totalRecords: totalRecords || 0,
        };
    }
}
