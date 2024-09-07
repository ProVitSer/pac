import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPhoneNumber } from '@app/common/validators/Ii-phone-number-constraint';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsString()
    @IsNotEmpty()
    contact_person_name: string;

    @IsString()
    @IsPhoneNumber({ message: 'Phone number must be in the format 79134567891' })
    @IsNotEmpty()
    company_phone: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    company_email: string;
}

export default CreateClientDto;
