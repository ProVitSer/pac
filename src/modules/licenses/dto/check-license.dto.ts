import { IsNotEmpty, IsString } from 'class-validator';

export class CheckLicenseDto {
    @IsString()
    @IsNotEmpty()
    license: string;
}

export default CheckLicenseDto;
