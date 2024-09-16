import { IsString } from 'class-validator';

export class HangupCallDto {
    @IsString()
    extension: string;
}

export default HangupCallDto;
