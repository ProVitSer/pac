import { Processor, Process, InjectQueue } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { Injectable } from '@nestjs/common';
import { CallOnProcessEvent } from '../interfaces/call-event-handler.interface';
import configuration from '@app/common/config/config.provider';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { AmqpService } from '@app/modules/amqp/services/amqp.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallEventHandler } from '../entities/call-event-handler.entity';
import { END_CALL_SQL, FULL_OUTGOING_CALL_INFO } from '@app/common/constants/sql';
import { Exchange, RoutingKey } from '@app/common/constants/amqp';
import { CallProcess } from '../interfaces/call-event-handler.enum';

@Injectable()
@Processor(configuration().bull.queueName)
export class CallProcessor {
    constructor(
        @InjectQueue(configuration().bull.queueName) private readonly callQueue: Queue,
        private readonly pacSqlService: PacSqlService,
        private readonly amqpService: AmqpService,
        @InjectRepository(CallEventHandler)
        private callEventHandlerRepository: Repository<CallEventHandler>,
    ) {}

    @Process()
    async handleCallCheck(job: Job) {
        const callRingiingData = job.data.data as CallOnProcessEvent;

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

    private async getEndCallId(callRingiingData: CallOnProcessEvent): Promise<string | undefined> {
        const externalCdr = await this.pacSqlService.sqlRequest(callRingiingData.client, {
            query: `${END_CALL_SQL} '%_${callRingiingData.callHistoryId}' ORDER BY id DESC`,
        });

        const parseResult = JSON.parse(externalCdr.result);

        return parseResult.length > 0 ? parseResult[0][0] : undefined;
    }

    private async checkCallInfo(callRingiingData: CallOnProcessEvent, callId: number): Promise<void> {
        await this.getFullCallInfo(callRingiingData, callId);

        await this.amqpService.sendMessage(Exchange.events, RoutingKey.callMissed, {
            clientId: callRingiingData.client.clientId,
            trunkName: '',
            externalNumber: '',
        });
    }

    private async getFullCallInfo(callRingiingData: CallOnProcessEvent, callId: number) {
        const externalCdr = await this.pacSqlService.sqlRequest(callRingiingData.client, {
            query: `${FULL_OUTGOING_CALL_INFO} ${callId}`,
        });

        const parseResult = JSON.parse(externalCdr.result);
    }
}
