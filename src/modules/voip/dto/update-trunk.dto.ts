import { IsOptional, IsString } from 'class-validator';

export class UpdateTrunkDto {
    @IsString()
    trunkId: string;

    @IsOptional()
    @IsString()
    authId?: string;

    @IsOptional()
    @IsString()
    authPassword?: string;

    @IsOptional()
    @IsString()
    pbxIp?: string;
}

export default UpdateTrunkDto;
