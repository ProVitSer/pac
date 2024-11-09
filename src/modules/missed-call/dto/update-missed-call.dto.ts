import { IsArray, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { MissedServiceType } from '../interfaces/missed-call.enum';

export class UpdateMissedCall {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    trunkName?: string;

    @IsEnum(MissedServiceType, { each: true })
    @IsArray()
    @IsOptional()
    missedServiceType?: MissedServiceType[];
}

export default UpdateMissedCall;
