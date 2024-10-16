import { IsString } from 'class-validator';

export class CreateSmsConfig {
    @IsString()
    login: string;

    @IsString()
    psw: string;
}

export default CreateSmsConfig;
