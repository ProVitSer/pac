import { Client } from '@app/modules/client/entities/client.entity';
import { Users } from '../entities/users.entity';
import { CreateUserData } from '../interfaces/users.interface';

export class CreateUserAdapter implements Partial<Users> {
    email: string;
    phoneNumber: string;
    name: string;
    password: string;
    isActive: boolean;
    registeredDate: Date;
    client: Client;
    constructor(userData: CreateUserData, client: Client) {
        this.email = userData.email;
        this.phoneNumber = userData.phoneNumber;
        this.name = userData.name;
        this.password = userData.password;
        this.isActive = true;
        this.registeredDate = new Date();
        this.client = client;
    }
}
