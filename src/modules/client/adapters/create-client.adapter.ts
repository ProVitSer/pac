import CreateClientDto from '../dto/create-client.dto';
import { Client } from '../entities/client.entity';
import { getUnixTime } from 'date-fns';

export class CreateClientAdapter implements Partial<Client> {
    clientId: number;
    companyName: string;
    contactPersonName: string;
    phone: string;
    email: string;

    constructor(clientData: CreateClientDto) {
        this.clientId = getUnixTime(new Date());
        this.companyName = clientData.companyName;
        this.contactPersonName = clientData.contactPersonName;
        this.phone = clientData.companyPhone;
        this.email = clientData.companyEmail;
    }
}
