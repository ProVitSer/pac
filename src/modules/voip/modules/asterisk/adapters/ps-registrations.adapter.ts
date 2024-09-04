import { DEFAULT_EXPIRATION, DEFAULT_FORBIDDEN_RETRY_INTERVAL, DEFAULT_MAX_RETRY, DEFAULT_RETRY_INTERVAL } from '../asterisk.constants';
import { DefaultYesNoAsterisk, PjsipTransport } from '../interfaces/asterisk.enum';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsRegistrationsAdapter {
    id: string;
    transport: PjsipTransport;
    outbound_auth: string;
    retry_interval: number;
    expiration: number;
    auth_rejection_permanent: DefaultYesNoAsterisk;
    contact_user: string;
    server_uri: string;
    client_uri: string;
    forbidden_retry_interval: number;
    max_retries: number;

    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.transport = PjsipTransport.udp;
        this.outbound_auth = data.trunkId;
        this.retry_interval = DEFAULT_RETRY_INTERVAL;
        this.expiration = DEFAULT_EXPIRATION;
        this.auth_rejection_permanent = DefaultYesNoAsterisk.yes;
        this.contact_user = data.trunkId;
        this.server_uri = `sip:${data.pbxIp}`;
        this.client_uri = `sip:${data.authId}@${data.pbxIp}`;
        this.forbidden_retry_interval = DEFAULT_FORBIDDEN_RETRY_INTERVAL;
        this.max_retries = DEFAULT_MAX_RETRY;
    }
}
