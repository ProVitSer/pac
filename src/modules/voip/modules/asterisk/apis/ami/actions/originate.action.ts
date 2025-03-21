import { Injectable } from '@nestjs/common';
import { BaseAction } from './base.action';
import * as namiLib from 'nami';
import { ChannelType } from '../../../interfaces/asterisk.enum';
import { AMI_ORIGINATE_OUTBOUND_CALL, AMI_ORIGINATE_ERROR } from '../ami.constants';
import { AmiOriginateCallData } from '../interfaces/ami.interface';
import { AsteriskOriginateResult } from '../../../interfaces/asterisk.interface';
import * as uuid from 'uuid';

@Injectable()
export class OriginateAction extends BaseAction {
    public async originateCall(data: AmiOriginateCallData): Promise<AsteriskOriginateResult> {
        try {
            const action = new namiLib.Actions.Originate();

            action.channel = `${ChannelType.LOCAL}/${data.srcNumber}@${AMI_ORIGINATE_OUTBOUND_CALL.context}`;
            action.callerid = this.formatPhoneNumber(data.dstNumber);
            action.priority = AMI_ORIGINATE_OUTBOUND_CALL.priority;
            action.timeout = AMI_ORIGINATE_OUTBOUND_CALL.timeout;
            action.context = AMI_ORIGINATE_OUTBOUND_CALL.context;
            action.exten = this.formatPhoneNumber(data.dstNumber);
            action.async = AMI_ORIGINATE_OUTBOUND_CALL.async;
            action.variable = `trunkId=${data.clientTrunkId}`;
            action.channelId = uuid.v4();
            try {
                await this.sendPromiseAction(action);
            } catch (e) {
                throw new Error(AMI_ORIGINATE_ERROR);
            }

            return action.ChannelId;
        } catch (e) {
            throw e;
        }
    }

    private formatPhoneNumber(phone: string): string {
        return phone.replace(/\D/g, '');
    }
}
