import { IsString } from 'class-validator';

export class CreateCqaConfigkDto {
    @IsString()
    authId: string;

    @IsString()
    authPassword: string;

    @IsString()
    pbxIp: string;
}

export default CreateCqaConfigkDto;
