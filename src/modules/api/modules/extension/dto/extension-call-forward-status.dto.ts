import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
    ApiExtensionStateType,
    ApiExtensionForwardStatus,
    ApiExtensionFwCallType,
    ApiExtensionFwToType,
} from '../interfaces/api-extension.enum';

export class ExtensionCallForwardStatusDto {
    @IsString()
    @IsNotEmpty()
    extension: string;

    @IsEnum(ApiExtensionForwardStatus)
    fwStatus: ApiExtensionForwardStatus;

    @IsEnum(ApiExtensionFwToType)
    fwTo: ApiExtensionFwToType;

    @IsEnum(ApiExtensionFwCallType)
    fwCall: ApiExtensionFwCallType;

    @IsEnum(ApiExtensionStateType)
    @IsOptional()
    extensionState: ApiExtensionStateType;

    @IsString()
    @IsOptional()
    number: string;
}

export default ExtensionCallForwardStatusDto;
