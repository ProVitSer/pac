import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Users } from '../entities/users.entity';
import { Permission, Role } from '@app/common/interfaces/enums';

export class UpdateUserDto implements Partial<Users> {
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @IsNumber({}, { each: true })
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone_number: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsEnum(Permission, { each: true })
    @IsOptional()
    permissions: Permission[];

    @IsEnum(Role, { each: true })
    @IsOptional()
    roles: Role[];
}

export default UpdateUserDto;
