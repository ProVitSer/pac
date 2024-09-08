import { AuthType } from '../interfaces/asterisk.enum';
import { CreateTrunkDataWithTrunkId } from '../interfaces/asterisk.interface';

export class PsAuthsAdapter {
    id: string;
    authType: AuthType;
    password: string;
    username: string;
    constructor(data: CreateTrunkDataWithTrunkId) {
        this.id = data.trunkId;
        this.authType = AuthType.userpass;
        this.password = data.authPassword;
        this.username = data.authId;
    }
}
