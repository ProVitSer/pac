import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RecordingType } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.enum';

export class CreateExtensionDto {
    @IsString()
    @IsNotEmpty()
    extension: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    authId: string;

    @IsString()
    @IsNotEmpty()
    authPassword: string;

    @IsString()
    @IsNotEmpty()
    mobileNumber: string;

    @IsString()
    @IsNotEmpty()
    outboundCallerId: string;

    @IsEnum(RecordingType)
    @IsNotEmpty()
    recordingType: RecordingType;

    @IsBoolean()
    @IsNotEmpty()
    isExtensionEnabled: boolean;

    @IsBoolean()
    @IsNotEmpty()
    disableExternalCalls: boolean;

    @IsBoolean()
    @IsNotEmpty()
    deliverAudio: boolean;

    @IsBoolean()
    @IsNotEmpty()
    supportReinvite: boolean;

    @IsBoolean()
    @IsNotEmpty()
    supportReplaces: boolean;
}

export default CreateExtensionDto;
