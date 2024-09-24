import { Client } from '@app/modules/client/entities/client.entity';
import { RoutingServiceType } from './smart-routing.enum';

export type SmartRoutingProviders = {
    [key in RoutingServiceType]: SmartRoutingProvider;
};

export interface SmartRoutingProvider {
    getRoutingInfo(data: IncomingCallData): Promise<GetRotingInfoData>;
}

export interface RotingInfoData {
    client: Client;
    pbxExtension: string;
    externalNumber: string;
}

export interface GetRotingInfoData {
    extension: string;
}

export interface IncomingCallData {
    externalNumber: string;
}
