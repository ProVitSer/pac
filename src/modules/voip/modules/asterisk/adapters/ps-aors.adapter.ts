import { DEFAULT_MAX_CONTACTS, DEFAULT_QUALIFY_FREQUENCY } from '../asterisk.constants';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsAorsAdapter {
    id: string;
    max_contacts: number;
    qualify_frequency: number;

    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.max_contacts = DEFAULT_MAX_CONTACTS;
        this.qualify_frequency = DEFAULT_QUALIFY_FREQUENCY;
    }
}
