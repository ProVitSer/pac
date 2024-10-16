import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Sms } from '../entities/sms.entity';
import { SmsService } from '../services/sms.service';
import { SmsSendStatus } from '../interfaces/sms.enum';

export class CheckSmsSendingStatusSchedule {
    constructor(
        @InjectRepository(Sms)
        private smsRepository: Repository<Sms>,
        private readonly smsService: SmsService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async checkSmsStatus() {
        const smsInProcess = await this.getSmsInProcess();
        for (const sms of smsInProcess) {
            await this.smsService.checkSmsStatus(sms.smsId);
        }
    }

    private async getSmsInProcess(): Promise<Sms[]> {
        return await this.smsRepository.find({
            where: {
                smsSendStatus: In([SmsSendStatus.inProgress]),
            },
        });
    }
}
