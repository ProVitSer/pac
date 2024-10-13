import { RoutingServiceType } from './smart-routing.enum';

export type SmartRoutingProviders = {
    [key in RoutingServiceType]: SmartRoutingProvider;
};

export interface SmartRoutingProvider {
    getRoutingInfo(data: IncomingCallData): Promise<GetRotingInfoProviderData>;
}

export interface RotingInfoData {
    clientId: number;
    pbxExtension: string;
    externalNumber: string;
}

export interface GetRotingInfoProviderData {
    firstname?: string;
    extension?: string;
}

export interface GetRotingInfoData {
    firstname?: string;
    extension?: string;
    aiRouting?: boolean;
    defaultRoutingNumber?: string;
}

export interface IncomingCallData {
    clientId: number;
    externalNumber: string;
}

export interface PbxExtensionList {
    name: string;
    number: string;
}
