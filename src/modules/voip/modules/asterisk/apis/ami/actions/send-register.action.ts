import { Injectable } from '@nestjs/common';
import { BaseAction } from './base.action';
import * as namiLib from 'nami';
import { SendResiterData } from '../interfaces/ami.interface';

@Injectable()
export class SendResiterAction extends BaseAction {
    public async sendRegisterToTrunk(data: SendResiterData): Promise<void> {
        try {
            const action = new namiLib.Actions.Command();

            action.Command = `pjsip send register ${data.trunkId}`;

            this.sendAction(action);
        } catch (e) {
            throw e;
        }
    }
}
