import { CONTEXT_BY_TRUNK_TYPE } from '../asterisk.constants';
import { DefaultYesNoAsterisk, PjsipTransport } from '../interfaces/asterisk.enum';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsEndpointsAdapter {
    id: string;
    transport: PjsipTransport;
    aors: string;
    auth: string;
    context: string;
    disallow: string;
    allow: string;
    directMedia: DefaultYesNoAsterisk;
    deny: string;
    permit: string;
    outboundAuth: string;
    fromUser: string;
    fromDomain: string;
    sendPai: DefaultYesNoAsterisk;
    sendRpid: DefaultYesNoAsterisk;
    setVar: string;
    accountcode: string;

    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.transport = PjsipTransport.udp;
        this.aors = data.trunkId;
        this.auth = data.trunkId;
        this.context = CONTEXT_BY_TRUNK_TYPE[data.applicationServiceType];
        this.disallow = 'all';
        this.allow = 'ulaw,alaw,gsm';
        this.directMedia = DefaultYesNoAsterisk.no;
        this.deny = '0.0.0.0/0';
        this.permit = '0.0.0.0/0';
        this.outboundAuth = data.trunkId;
        this.fromUser = data.authId;
        this.fromDomain = data.authId;
        this.sendPai = DefaultYesNoAsterisk.yes;
        this.sendRpid = DefaultYesNoAsterisk.yes;
        this.setVar = `CLIENT_ID=${data.client.clientId};APPLICATION_SERVICE_TYPE=${data.applicationServiceType}`;
        this.accountcode = `${data.client.clientId}`;
    }
}
