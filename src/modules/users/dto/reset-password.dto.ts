import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPassword {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    verificationCode: string;
}

export default ResetPassword;
