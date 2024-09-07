import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';
import { IsPhoneNumber } from '@app/common/validators/Ii-phone-number-constraint';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    company_name: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    company_email: string;

    @IsString()
    @IsNotEmpty()
    contact_person_name: string;

    @IsString()
    @IsPhoneNumber({ message: 'Phone number must be in the format 79134567891' })
    @IsNotEmpty()
    company_phone: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password must contain uppercase, lowercase, number and special character',
    })
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    user_email: string;

    @IsString()
    @IsNotEmpty()
    user_phone_number: string;

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    products_id: number[];
}

export default RegisterDto;
