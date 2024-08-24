import { IsNotEmpty, IsString } from 'class-validator';

export class ActivateLicenseDto {
    @IsString()
    @IsNotEmpty()
    license: string;
}

export default ActivateLicenseDto;
