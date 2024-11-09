import { IsOptional } from 'class-validator';

export class CheckVerificationCodeDto {
    @IsOptional()
    verificationCode: string;
}

export default CheckVerificationCodeDto;
