import { IsEnum } from 'class-validator';
import { ApplicationServiceType } from '@app/common/interfaces/enums';

export class UploadAudioDto {
    @IsEnum(ApplicationServiceType)
    applicationServiceType: ApplicationServiceType;
}

export default UploadAudioDto;
