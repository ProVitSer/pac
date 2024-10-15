import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { CallRingingData, EndCallData } from '../../interfaces/call-event-handler.interface';
import configuration from '@app/common/config/config.provider';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallEventHandler } from '../../entities/call-event-handler.entity';
import { END_CALL_SQL } from '@app/common/constants/sql';
import { CallDirection, CallProcess } from '../../interfaces/call-event-handler.enum';
import { IncomingCallHandlerService } from '../handlers/incoming-call-handler.service';
import { LocalCallHandlerService } from '../handlers/local-call-handler.service';
import { OutgoingCallHandlerService } from '../handlers/outgoing-call-handler.service';

@Injectable()
@Processor(configuration().bull.queueName)
export class CallProcessor {
    constructor(
        @InjectQueue(configuration().bull.queueName) private readonly callQueue: Queue,
        private readonly pacSqlService: PacSqlService,
        @InjectRepository(CallEventHandler)
        private callEventHandlerRepository: Repository<CallEventHandler>,
        private readonly incomingCallHandlerService: IncomingCallHandlerService,
        private readonly localCallHandlerService: LocalCallHandlerService,
        private readonly outgoingCallHandlerService: OutgoingCallHandlerService,
    ) {}

    @Process()
    async handleCallCheck(job: Job) {
        const callRingiingData = job.data.data as CallRingingData;

        const endCallData = await this.getEndCallData(callRingiingData);

        if (endCallData?.callId) {
            const callHandlerInfo = await this.callEventHandlerRepository.findOne({
                where: { originalCallHistoryId: endCallData.originalCallHistoryId },
            });

            if (!callHandlerInfo) {
                await job.moveToCompleted();
                await this.callEventHandlerRepository.update(
                    { callHistoryId: callRingiingData.callHistoryId },
                    {
                        callId: endCallData?.callId,
                        callProcess: CallProcess.callEnd,
                        originalCallHistoryId: endCallData.originalCallHistoryId,
                    },
                );
                return this.checkCallInfo(callRingiingData, Number(endCallData?.callId));
            }
        }
        await this.callQueue.add({ data: callRingiingData }, { delay: 5000 });
    }

    private async getEndCallData(callRingiingData: CallRingingData): Promise<EndCallData | undefined> {
        const externalCdr = await this.pacSqlService.sqlRequest(callRingiingData.clientId, {
            query: `${END_CALL_SQL} '%\\_${callRingiingData.callHistoryId}'  ESCAPE '\\' ORDER BY id DESC`,
        });

        const parseResult = JSON.parse(externalCdr.result);

        return parseResult.length > 0 ? { callId: parseResult[0][0], originalCallHistoryId: parseResult[0][1] } : undefined;
    }

    private async checkCallInfo(callRingiingData: CallRingingData, callId: number): Promise<void> {
        switch (callRingiingData.callDireciton) {
            case CallDirection.incoming:
                return await this.incomingCallHandlerService.handleIncoming(callRingiingData, callId);
            case CallDirection.local:
                return await this.localCallHandlerService.handleIncoming(callRingiingData, callId);
            case CallDirection.outgoing:
                return await this.outgoingCallHandlerService.handleIncoming(callRingiingData, callId);
            default:
                break;
        }
    }
}
