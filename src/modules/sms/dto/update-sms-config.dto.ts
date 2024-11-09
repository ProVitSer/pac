import { IsOptional, IsString } from 'class-validator';

export class UpdateSmsConfig {
    @IsOptional()
    @IsString()
    login?: string;

    @IsOptional()
    @IsString()
    psw?: string;
}

export default UpdateSmsConfig;
