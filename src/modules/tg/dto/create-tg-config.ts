import { IsOptional, IsString } from 'class-validator';

export class CreatTgConfig {
    @IsString()
    token: string;

    @IsString()
    chatId: string;

    @IsString()
    @IsOptional()
    message?: string;
}

export default CreatTgConfig;
