import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChangeUserPasswordDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsString()
    @IsNotEmpty()
    old_password: string;

    @IsString()
    @IsNotEmpty()
    new_password: string;
}

export default ChangeUserPasswordDto;
