import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTgConfig {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    token?: string;

    @IsString()
    @IsOptional()
    chatId?: string;
}

export default UpdateTgConfig;
