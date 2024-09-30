import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { CallRingingData } from '../interfaces/call-event-handler.interface';
import configuration from '@app/common/config/config.provider';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallEventHandler } from '../entities/call-event-handler.entity';
import { END_CALL_SQL } from '@app/common/constants/sql';
import { CallDirection, CallProcess } from '../interfaces/call-event-handler.enum';
import { IncomingCallHandlerService } from './incoming-call-handler.service';

@Injectable()
@Processor(configuration().bull.queueName)
export class CallProcessor {
    constructor(
        @InjectQueue(configuration().bull.queueName) private readonly callQueue: Queue,
        private readonly pacSqlService: PacSqlService,
        @InjectRepository(CallEventHandler)
        private callEventHandlerRepository: Repository<CallEventHandler>,
        private readonly incomingCallHandlerService: IncomingCallHandlerService,
    ) {}

    @Process()
    async handleCallCheck(job: Job) {
        const callRingiingData = job.data.data as CallRingingData;

        const callId = await this.getEndCallId(callRingiingData);

        if (callId) {
            await job.moveToCompleted();
            await this.callEventHandlerRepository.update(
                { callHistoryId: callRingiingData.callHistoryId },
                { callId: callId, callProcess: CallProcess.callEnd },
            );
            return this.checkCallInfo(callRingiingData, Number(callId));
        }
        await this.callQueue.add({ data: callRingiingData }, { delay: 5000 });
    }

    private async getEndCallId(callRingiingData: CallRingingData): Promise<string | undefined> {
        const externalCdr = await this.pacSqlService.sqlRequest(callRingiingData.client, {
            query: `${END_CALL_SQL} '%_${callRingiingData.callHistoryId}' ORDER BY id DESC`,
        });

        const parseResult = JSON.parse(externalCdr.result);

        return parseResult.length > 0 ? parseResult[0][0] : undefined;
    }

    private async checkCallInfo(callRingiingData: CallRingingData, callId: number): Promise<void> {
        switch (callRingiingData.callDireciton) {
            case CallDirection.incoming:
                return await this.incomingCallHandlerService.handleOutbound(callRingiingData, callId);

            default:
                break;
        }
    }
}
