import { IsEnum, IsString } from 'class-validator';
import { TrunkType } from '../interfaces/voip.enum';

export class CreateTrunkDto {
    @IsEnum(TrunkType)
    trunkType: TrunkType;

    @IsString()
    authId: string;

    @IsString()
    authPassword: string;

    @IsString()
    pbxIp: string;
}

export default CreateTrunkDto;
