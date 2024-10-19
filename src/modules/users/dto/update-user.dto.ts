import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Users } from '../entities/users.entity';

export class UpdateUserDto implements Partial<Users> {
    @IsNumber()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsOptional()
    firstname?: string;

    @IsString()
    @IsOptional()
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    lastname?: string;
}

export default UpdateUserDto;
