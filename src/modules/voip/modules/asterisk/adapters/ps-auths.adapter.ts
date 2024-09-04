import { AuthType } from '../interfaces/asterisk.enum';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsAuthsAdapter {
    id: string;
    auth_type: AuthType;
    password: string;
    username: string;
    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.auth_type = AuthType.userpass;
        this.password = data.authPassword;
        this.username = data.authId;
    }
}
