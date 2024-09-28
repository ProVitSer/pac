import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { CallRingingEvent } from '../interfaces/call-event-handler.interface';
import configuration from '@app/common/config/config.provider';

@Injectable()
@Processor(configuration().bull.queueName)
export class CallProcessor {
    constructor() {}

    @Process()
    async handleCallCheck(job: Job) {
        console.log(job);

        const callRingiingData = job.data as CallRingingEvent;
        console.log(callRingiingData);
    }
}
