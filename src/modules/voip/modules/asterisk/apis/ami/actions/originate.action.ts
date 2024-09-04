import { Injectable } from '@nestjs/common';
import { BaseAction } from './base.action';
import * as namiLib from 'nami';
import { ChannelType } from '../../../interfaces/asterisk.enum';
import { AMI_ORIGINATE_OUTBOUND_CALL } from '../ami.constants';
import { OriginateCallData } from '../interfaces/ami.interface';

@Injectable()
export class OriginateAction extends BaseAction {
    public async originateCall(data: OriginateCallData): Promise<void> {
        try {
            const action = new namiLib.Actions.Originate();

            action.channel = `${ChannelType.PJSIP}/${data.clientTrunkId}/${data.srcNumber}`;
            action.callerid = data.dstNumber;
            action.priority = AMI_ORIGINATE_OUTBOUND_CALL.priority;
            action.timeout = AMI_ORIGINATE_OUTBOUND_CALL.timeout;
            action.context = AMI_ORIGINATE_OUTBOUND_CALL.context;
            action.exten = data.dstNumber;
            action.async = AMI_ORIGINATE_OUTBOUND_CALL.async;

            await this.sendAction(action);
        } catch (e) {
            throw e;
        }
    }
}
