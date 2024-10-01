import { IsString, MaxLength, MinLength } from 'class-validator';
import configuration from '@app/common/config/config.provider';

export class MakeExternalCallDto {
    @IsString()
    @MinLength(configuration().pbx.extensionLength)
    @MaxLength(configuration().pbx.extensionLength)
    localExtension: string;

    @IsString()
    externalNumber: string;
}

export default MakeExternalCallDto;
