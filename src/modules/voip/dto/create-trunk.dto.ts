import { IsEnum, IsString } from 'class-validator';
import { ApplicationServiceType } from '@app/common/interfaces/enums';

export class CreateTrunkDto {
    @IsEnum(ApplicationServiceType)
    applicationServiceType: ApplicationServiceType;

    @IsString()
    authId: string;

    @IsString()
    authPassword: string;

    @IsString()
    pbxIp: string;
}

export default CreateTrunkDto;
