import { Injectable } from '@nestjs/common';
import { BaseAction } from './base.action';
import * as namiLib from 'nami';
import { RegistrationStatusData } from '../interfaces/ami.interface';

@Injectable()
export class RegistrationStatusAction extends BaseAction {
    public async getRegisterTrunkStatus(data: RegistrationStatusData): Promise<void> {
        try {
            const action = new namiLib.Actions.Command();

            action.Command = `pjsip show registration ${data.trunkId}`;

            await this.sendAction(action);
        } catch (e) {
            throw e;
        }
    }
}
