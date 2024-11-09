import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTgUser {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    extension?: string;
}

export default UpdateTgUser;
