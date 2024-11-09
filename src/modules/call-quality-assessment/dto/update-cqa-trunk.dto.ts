import { IsString } from 'class-validator';

export class UpdateCqaConfigkDto {
    @IsString()
    authId: string;

    @IsString()
    authPassword: string;

    @IsString()
    pbxIp: string;
}

export default UpdateCqaConfigkDto;
