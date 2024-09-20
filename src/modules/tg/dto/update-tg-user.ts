import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTgUser {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    userName?: string;

    @IsString()
    @IsOptional()
    extension?: string;
}

export default UpdateTgUser;
