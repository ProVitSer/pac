import { RoutingServiceType } from './smart-routing.enum';

export type SmartRoutingProviders = {
    [key in RoutingServiceType]: SmartRoutingProvider;
};

export interface SmartRoutingProvider {
    getRoutingInfo(data: IncomingCallData): Promise<GetRotingInfoData>;
}

export interface RotingInfoData {
    clientId: number;
    pbxExtension: string;
    externalNumber: string;
}

export interface GetRotingInfoData {
    extension?: string;
}

export interface IncomingCallData {
    clientId: number;
    externalNumber: string;
}

export interface PbxExtensionList {
    name: string;
    number: string;
}
