import { IsNotEmpty, IsString } from 'class-validator';

export class LicenseCommercialDto {
    @IsString()
    @IsNotEmpty()
    license: string;
}

export default LicenseCommercialDto;
