import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsPhoneNumber } from '@app/common/validators/Ii-phone-number-constraint';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname: string;

    @IsString()
    @IsPhoneNumber({ message: 'Phone number must be in the format 79134567891' })
    @IsNotEmpty()
    companyPhone: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    companyEmail: string;
}

export default CreateClientDto;
