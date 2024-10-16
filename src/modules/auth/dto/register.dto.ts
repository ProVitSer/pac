import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MinLength } from 'class-validator';
import { IsPhoneNumber } from '@app/common/validators/Ii-phone-number-constraint';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    companyEmail: string;

    @IsString()
    @IsNotEmpty()
    contactPersonName: string;

    @IsString()
    @IsPhoneNumber({ message: 'Phone number must be in the format 79134567891' })
    @IsNotEmpty()
    companyPhone: string;

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
    userEmail: string;

    @IsString()
    @IsNotEmpty()
    userPhoneNumber: string;

    @IsNumber({}, { each: true })
    @IsNotEmpty()
    productsId: number[];
}

export default RegisterDto;
