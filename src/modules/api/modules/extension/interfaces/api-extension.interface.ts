import { ApiExtensionRecordingType, ApiExtensionEmailOptionsType } from './api-extension.enum';

export interface ExtensionInfo {
    extension: string;
    firstName: string;
    lastName: string;
    email: string;
    authId: string;
    authPassword: string;
    mobileNumber: string;
    sipId: string;
    outboundCallerId: string;
    recordingType: ApiExtensionRecordingType;
    isExtensionEnabled: boolean;
    disableExternalCalls: string;
    deliverAudio: string;
    supportReinvite: string;
    supportReplaces: string;
    emailOptions: ApiExtensionEmailOptionsType;
    voiceMailEnable: boolean;
    voiceMailPin: string;
    voiceMailPlayCallerId: boolean;
    internal: boolean;
    noAnswerTimeout: number;
}
