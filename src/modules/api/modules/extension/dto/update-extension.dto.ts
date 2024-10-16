import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { RecordingType } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.enum';

export class UpdateExtensionDto {
    @IsString()
    extension: string;

    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    authId?: string;

    @IsString()
    @IsOptional()
    authPassword?: string;

    @IsString()
    @IsOptional()
    mobileNumber?: string;

    @IsString()
    @IsOptional()
    outboundCallerId?: string;

    @IsEnum(RecordingType)
    @IsOptional()
    recordingType?: RecordingType;

    @IsBoolean()
    @IsOptional()
    isExtensionEnabled?: boolean;

    @IsBoolean()
    @IsOptional()
    disableExternalCalls?: boolean;

    @IsBoolean()
    @IsOptional()
    deliverAudio?: boolean;

    @IsBoolean()
    @IsOptional()
    supportReinvite?: boolean;

    @IsBoolean()
    @IsOptional()
    supportReplaces?: boolean;
}

export default UpdateExtensionDto;
