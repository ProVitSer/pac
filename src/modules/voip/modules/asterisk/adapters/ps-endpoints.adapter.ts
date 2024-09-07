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
    direct_media: DefaultYesNoAsterisk;
    deny: string;
    permit: string;
    outbound_auth: string;
    from_user: string;
    from_domain: string;
    send_pai: DefaultYesNoAsterisk;
    send_rpid: DefaultYesNoAsterisk;
    set_var: string;
    accountcode: string;

    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.transport = PjsipTransport.udp;
        this.aors = data.trunkId;
        this.auth = data.trunkId;
        this.context = CONTEXT_BY_TRUNK_TYPE[data.trunkType];
        this.disallow = 'all';
        this.allow = 'ulaw,alaw,gsm';
        this.direct_media = DefaultYesNoAsterisk.no;
        this.deny = '0.0.0.0/0';
        this.permit = '0.0.0.0/0';
        this.outbound_auth = data.trunkId;
        this.from_user = data.authId;
        this.from_domain = data.authId;
        this.send_pai = DefaultYesNoAsterisk.yes;
        this.send_rpid = DefaultYesNoAsterisk.yes;
        this.set_var = `CLIENT_ID=${data.client.client_id};TRUNK_TYPE=${data.trunkType}`;
        this.accountcode = `${data.client.client_id}`;
    }
}
