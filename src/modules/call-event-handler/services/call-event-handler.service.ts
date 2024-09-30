import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import configuration from '@app/common/config/config.provider';
import { CallOnProcessEvent, DetermineCallDirectionData } from '../interfaces/call-event-handler.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CallEventHandler } from '../entities/call-event-handler.entity';
import { DetermineCallDirectionService } from './determine-call-direction.service';

@Injectable()
export class CallEventHandlerService {
    constructor(
        @InjectQueue(configuration().bull.queueName) private readonly callQueue: Queue,
        private dataSource: DataSource,
        @InjectRepository(CallEventHandler)
        private callEventHandlerRepository: Repository<CallEventHandler>,
    ) {}

    async handleCall(data: CallOnProcessEvent): Promise<void> {
        await this.addCallInfo(data);
    }

    public async addCallInfo(data: CallOnProcessEvent): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();

        const determineCallDirection = DetermineCallDirectionService.determine(data.activeConnectionsInfo);

        const callEventHandler = await this.callEventHandlerRepository.findOne({
            where: { callHistoryId: determineCallDirection[0].callHistoryId },
        });

        if (callEventHandler) return;

        await queryRunner.connect();

        await queryRunner.startTransaction();

        try {
            const callEventHandler = this.callEventHandlerRepository.create();

            callEventHandler.callHistoryId = determineCallDirection[0].callHistoryId;

            callEventHandler.callDirection = determineCallDirection[0].callDireciton;

            await this.callEventHandlerRepository.save(callEventHandler);

            await queryRunner.commitTransaction();

            await this.addCallToqQueue(data, determineCallDirection);
        } catch (err) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    private async addCallToqQueue(data: CallOnProcessEvent, determineCallDirection: DetermineCallDirectionData[]) {
        await this.callQueue.add(
            {
                data: {
                    ...data,
                    callDireciton: determineCallDirection[0].callDireciton,
                },
            },
            {
                removeOnComplete: true,
            },
        );
    }
}
