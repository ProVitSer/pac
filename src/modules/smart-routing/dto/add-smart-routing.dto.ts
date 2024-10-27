import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoutingServiceType } from '../interfaces/smart-routing.enum';

export class AddSmartRouting {
    @IsString()
    pbxExtension: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(RoutingServiceType)
    routingService: RoutingServiceType;

    @IsBoolean()
    aiRouting: boolean;

    @IsString()
    defaultRoutingNumber: string;
}

export default AddSmartRouting;
