import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiExtensionForwardStatus } from '../interfaces/api-extension.enum';

export class ExtensionForwardStatusDto {
    @IsString()
    @IsNotEmpty()
    extension: string;

    @IsEnum(ApiExtensionForwardStatus)
    @IsNotEmpty()
    fwStatus: ApiExtensionForwardStatus;
}

export default ExtensionForwardStatusDto;
