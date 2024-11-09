import { IsEnum, IsNumber, IsString } from 'class-validator';
import { CallResult } from '../interfaces/call-quality-assessment.enum';

export class AddCqasData {
    @IsNumber()
    clientId: number;

    @IsString()
    number: string;

    @IsString()
    exten: string;

    @IsString()
    @IsEnum(CallResult)
    callResult: CallResult;

    @IsString()
    channelId: string;

    @IsString()
    uniqueid: string;

    @IsString()
    rating: string;
}

export default AddCqasData;
