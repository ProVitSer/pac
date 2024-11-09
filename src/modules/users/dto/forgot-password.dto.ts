import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPassword {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;
}

export default ForgotPassword;
