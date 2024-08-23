import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Client } from '../entities/client.entity';
import { IsPhoneNumber } from '@app/common/validators/Ii-phone-number-constraint';

export class UpdateClientDto implements Partial<Client> {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsOptional()
    company_name: string;

    @IsString()
    @IsOptional()
    contact_person_name: string;

    @IsString()
    @IsPhoneNumber({ message: 'Phone number must be in the format 79134567891' })
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    email: string;
}

export default UpdateClientDto;