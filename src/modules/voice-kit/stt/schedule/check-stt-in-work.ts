import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Stt } from '../entities/stt.entity';
import { SttService } from '../services/stt.service';
import { SttRecognizeStatus } from '../interfaces/stt.enum';

@Injectable()
export class CheckSTTInWorkSchedule {
    constructor(
        @InjectRepository(Stt)
        private sstRepository: Repository<Stt>,
        private readonly sttService: SttService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async check() {
        if (!process.env.NODE_APP_INSTANCE || Number(process.env.NODE_APP_INSTANCE) === 0) {
            const sttList = await this.getSTTInWork();

            if (sttList.length == 0) return;

            for (const stt of sttList) {
                try {
                    switch (stt.sttRecognizeStatus) {
                        case SttRecognizeStatus.inProgress:
                            return await this.sttService.getRecognizeStatus({ sttId: stt.sttId, sttProviderType: stt.sttProviderType });
                        case SttRecognizeStatus.done:
                            return await this.sttService.getRecognizeResult({ sttId: stt.sttId, sttProviderType: stt.sttProviderType });
                        default:
                            break;
                    }
                } catch (e) {
                    await this.sstRepository.update({ sttId: stt.sttId }, { sttRecognizeStatus: SttRecognizeStatus.error });
                }
            }
        }
    }

    private async getSTTInWork(): Promise<Stt[]> {
        return await this.sstRepository.find({
            where: {
                sttRecognizeStatus: In([SttRecognizeStatus.inProgress, SttRecognizeStatus.done]),
            },
        });
    }
}
