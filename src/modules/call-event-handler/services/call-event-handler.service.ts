import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import configuration from '@app/common/config/config.provider';
import { CallRingingEvent } from '../interfaces/call-event-handler.interface';

@Injectable()
export class CallEventHandlerService {
    constructor(@InjectQueue(configuration().bull.queueName) private readonly callQueue: Queue) {}

    async handleRingingCall(data: CallRingingEvent): Promise<void> {
        await this.callQueue.add(
            { data },
            {
                repeat: {
                    every: 5000,
                },
                removeOnComplete: true,
            },
        );
    }
}
