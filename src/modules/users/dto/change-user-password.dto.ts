import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangeUserPasswordDto {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    oldPassword: string;

    @IsString()
    @IsNotEmpty()
    newPassword: string;
}

export default ChangeUserPasswordDto;
