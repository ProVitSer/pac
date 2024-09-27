import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { RoutingServiceType } from '../interfaces/smart-routing.enum';

export class UpdateSmartRouting {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    pbxExtension?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(RoutingServiceType)
    @IsOptional()
    routingService?: RoutingServiceType;
}

export default UpdateSmartRouting;
