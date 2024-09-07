import CreateClientDto from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';
import { getUnixTime } from 'date-fns';

export class CreateClientAdapter implements Partial<Client> {
    client_id: number;
    company_name: string;
    contact_person_name: string;
    phone: string;
    email: string;

    constructor(clientData: CreateClientDto) {
        this.client_id = getUnixTime(new Date());
        this.company_name = clientData.company_name;
        this.contact_person_name = clientData.contact_person_name;
        this.phone = clientData.company_phone;
        this.email = clientData.company_email;
    }
}
