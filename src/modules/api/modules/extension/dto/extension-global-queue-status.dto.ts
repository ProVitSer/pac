import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiExtensionQueueStatus } from '../interfaces/api-extension.enum';

export class ExtensionGlobalQueueStatusDto {
    @IsString()
    @IsNotEmpty()
    extension: string;

    @IsEnum(ApiExtensionQueueStatus)
    @IsNotEmpty()
    status: ApiExtensionQueueStatus;
}

export default ExtensionGlobalQueueStatusDto;
