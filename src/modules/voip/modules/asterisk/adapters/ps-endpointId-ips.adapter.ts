import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsEndpointIdIpsAdapter {
    id: string;
    endpoint: string;
    match: string;
    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.endpoint = data.trunkId;
        this.match = data.pbxIp;
    }
}
