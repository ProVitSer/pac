import { AmqpService } from '@app/modules/amqp/services/amqp.service';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CallEventHandler } from '../../entities/call-event-handler.entity';
import { CallOnProcessEvent, CallRingingData, FullCallInfo } from '../../interfaces/call-event-handler.interface';
import { Exchange, RoutingKey } from '@app/common/constants/amqp';
import { TransformedCallData } from '../call/transformed-call-data.service';
import { CallDirection } from '../../interfaces/call-event-handler.enum';
import { FULL_INCOMING_CALL_INFO } from '@app/common/constants/sql';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LocalCallHandlerService {
    constructor(
        private readonly amqpService: AmqpService,
        @InjectRepository(CallEventHandler)
        private callEventHandlerRepository: Repository<CallEventHandler>,
        private readonly transformedCallData: TransformedCallData,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async handleIncoming(callRingiingData: CallRingingData, callId: number): Promise<void> {
        try {
            const fullCallInfo = await this.transformedCallData.getFullCallInfo(callRingiingData, callId, FULL_INCOMING_CALL_INFO);

            await this.checkCallInfo(callRingiingData, fullCallInfo, callId);
        } catch (e) {
            this.logger.error(e);

            return;
        }
    }

    private async checkCallInfo(callRingiingData: CallOnProcessEvent, fullCallInfo: FullCallInfo[], callId: number): Promise<void> {
        const sortedFullCallInfo = fullCallInfo.sort((a, b) => Number(a.segmentId) - Number(b.segmentId));

        await this.addCallData(callRingiingData, fullCallInfo);

        this.sendCallToAnalitics(callRingiingData, sortedFullCallInfo, callId);
    }

    private async sendCallToAnalitics(callRingiingData: CallOnProcessEvent, fullCallInfo: FullCallInfo[], callId: number): Promise<void> {
        await this.amqpService.sendMessage(Exchange.events, RoutingKey.localCallAnalitics, {
            callDireciton: CallDirection.local,
            fullCallInfo,
            callId,
            clientId: callRingiingData.clientId,
        });
    }

    private async addCallData(callRingiingData: CallOnProcessEvent, fullCallInfo: FullCallInfo[]): Promise<void> {
        await this.callEventHandlerRepository.update({ callHistoryId: callRingiingData.callHistoryId }, { fullCallInfo });
    }
}
