import { Injectable } from '@nestjs/common';
import { BaseAction } from './base.action';
import * as namiLib from 'nami';
import { SendResiterData } from '../interfaces/ami.interface';

@Injectable()
export class SendResiterAction extends BaseAction {
    public async sendRegisterToTrunk(data: SendResiterData): Promise<void> {
        try {
            const reload = new namiLib.Actions.Command();

            reload.Command = `module reload res_pjsip.so`;

            this.sendAction(reload);

            const pjsipRegister = new namiLib.Actions.Command();

            pjsipRegister.Command = `pjsip send register ${data.trunkId}`;

            this.sendAction(pjsipRegister);
        } catch (e) {
            throw e;
        }
    }
}
