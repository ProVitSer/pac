import { Device } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.interface';
import {
    ApiExtensionRecordingType,
    ApiExtensionEmailOptionsType,
    ApiExtensionForwardStatus,
    ApiExtensionQueueStatus,
} from './api-extension.enum';

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
    disableExternalCalls: boolean;
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

export interface ExtensionStatus {
    firstName: string;
    lastName: string;
    email: string;
    extension: string;
    registered: string;
    forwardingRulesStatus: ApiExtensionForwardStatus;
    queuesStatus: ApiExtensionQueueStatus;
    groups: string[];
    inRingGroups: string[];
    loggedInQueues: string[];
    devices: Device[];
}

export interface ExtensionsList {
    extensions: string[];
}

export interface RegisteredExtensions extends ExtensionsList {}

export interface BaseExtensionResult {
    result: boolean;
}
