import { IsString, MaxLength, MinLength } from 'class-validator';
import configuration from '@app/common/config/config.provider';

export class MakeLocalCallDto {
    @IsString()
    @MinLength(configuration().pbx.extensionLength)
    @MaxLength(configuration().pbx.extensionLength)
    from: string;

    @IsString()
    @MinLength(configuration().pbx.extensionLength)
    @MaxLength(configuration().pbx.extensionLength)
    to: string;
}

export default MakeLocalCallDto;
