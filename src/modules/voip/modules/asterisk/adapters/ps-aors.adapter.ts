import { DEFAULT_MAX_CONTACTS, DEFAULT_QUALIFY_FREQUENCY } from '../asterisk.constants';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsAorsAdapter {
    id: string;
    maxContacts: number;
    qualifyFrequency: number;

    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.maxContacts = DEFAULT_MAX_CONTACTS;
        this.qualifyFrequency = DEFAULT_QUALIFY_FREQUENCY;
    }
}
