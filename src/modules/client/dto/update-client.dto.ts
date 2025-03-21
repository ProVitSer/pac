import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Client } from '../entities/client.entity';
import { IsPhoneNumber } from '@app/common/validators/Ii-phone-number-constraint';

export class UpdateClientDto implements Partial<Client> {
    @IsString()
    @IsOptional()
    companyName?: string;

    @IsString()
    @IsOptional()
    contactPersonName?: string;

    @IsString()
    @IsPhoneNumber({ message: 'Phone number must be in the format 79134567891' })
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    @IsEmail()
    email?: string;
}

export default UpdateClientDto;
