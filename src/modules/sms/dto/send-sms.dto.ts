import { IsString } from 'class-validator';

export class SendSmsDto {
    @IsString()
    externalNumber: string;

    @IsString()
    smsText: string;
}

export default SendSmsDto;
