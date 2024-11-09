import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiExtensionQueueStatus } from '../interfaces/api-extension.enum';

export class ExtensionQueueStatusDto {
    @IsString()
    @IsNotEmpty()
    extension: string;

    @IsString()
    @IsNotEmpty()
    queueNumber: string;

    @IsEnum(ApiExtensionQueueStatus)
    @IsNotEmpty()
    status: ApiExtensionQueueStatus;
}

export default ExtensionQueueStatusDto;
