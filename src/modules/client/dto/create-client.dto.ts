import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Client } from '../entities/client.entity';
import { IsPhoneNumber } from '@app/common/validators/Ii-phone-number-constraint';

export class CreateClientDto implements Partial<Client> {
    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsString()
    @IsNotEmpty()
    contact_person_name: string;

    @IsString()
    @IsPhoneNumber({ message: 'Phone number must be in the format 79134567891' })
    @IsNotEmpty()
    phone: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export default CreateClientDto;
