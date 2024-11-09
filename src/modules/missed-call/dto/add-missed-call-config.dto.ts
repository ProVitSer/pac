import { IsArray, IsEnum, IsString } from 'class-validator';
import { MissedServiceType } from '../interfaces/missed-call.enum';

export class AddMissedCallConfig {
    @IsString()
    trunkName: string;

    @IsEnum(MissedServiceType, { each: true })
    @IsArray()
    missedServiceType: MissedServiceType[];
}

export default AddMissedCallConfig;
