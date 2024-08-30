import { IsNotEmpty, IsString } from 'class-validator';

export class DeactivateLicenseDto {
    @IsString()
    @IsNotEmpty()
    license: string;
}

export default DeactivateLicenseDto;
