import { DEFAULT_EXPIRATION, DEFAULT_FORBIDDEN_RETRY_INTERVAL, DEFAULT_MAX_RETRY, DEFAULT_RETRY_INTERVAL } from '../asterisk.constants';
import { DefaultYesNoAsterisk, PjsipTransport } from '../interfaces/asterisk.enum';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsRegistrationsAdapter {
    id: string;
    transport: PjsipTransport;
    outboundAuth: string;
    retryInterval: number;
    expiration: number;
    authRejectionPermanent: DefaultYesNoAsterisk;
    contactUser: string;
    serverUri: string;
    clientUri: string;
    forbiddenRetryInterval: number;
    maxRetries: number;

    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.transport = PjsipTransport.udp;
        this.outboundAuth = data.trunkId;
        this.retryInterval = DEFAULT_RETRY_INTERVAL;
        this.expiration = DEFAULT_EXPIRATION;
        this.authRejectionPermanent = DefaultYesNoAsterisk.yes;
        this.contactUser = data.authId;
        this.serverUri = `sip:${data.pbxIp}`;
        this.clientUri = `sip:${data.authId}@${data.pbxIp}`;
        this.forbiddenRetryInterval = DEFAULT_FORBIDDEN_RETRY_INTERVAL;
        this.maxRetries = DEFAULT_MAX_RETRY;
    }
}
