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
import { END_CALL_SQL } from '@app/common/constants/sql';

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
            return await job.moveToCompleted();
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
}
