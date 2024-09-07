import { Client } from '@app/modules/client/entities/client.entity';
import { Users } from '../entities/users.entity';
import { CreateUserData } from '../interfaces/users.interface';

export class CreateUserAdapter implements Partial<Users> {
    email: string;
    phone_number: string;
    name: string;
    password: string;
    is_active: boolean;
    registered_date: Date;
    client: Client;
    constructor(userData: CreateUserData, client: Client) {
        this.email = userData.email;
        this.phone_number = userData.phone_number;
        this.name = userData.name;
        this.password = userData.password;
        this.is_active = true;
        this.registered_date = new Date();
        this.client = client;
    }
}
