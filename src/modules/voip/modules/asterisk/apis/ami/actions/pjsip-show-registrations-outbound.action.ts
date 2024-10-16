import { Injectable } from '@nestjs/common';
import { BaseAction } from './base.action';
import * as namiLib from 'nami';
import { BaseActionResult } from '../interfaces/ami.interface';

@Injectable()
export class PjsipShowRegistrationsOutboundAction extends BaseAction {
    public async sendShowRegistrations(): Promise<BaseActionResult> {
        try {
            const action = new namiLib.Actions.Command();

            action.Action = 'PJSIPShowRegistrationsOutbound';

            return await this.sendPromiseAction<BaseActionResult>(action);
        } catch (e) {
            throw e;
        }
    }
}
