import { ExtensionInfoReply } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.interface';
import { ApiExtensionRecordingType, ApiExtensionEmailOptionsType } from '../interfaces/api-extension.enum';
import {
    EXTENSION_RECORDING_TO_API_EXTENSION_RECORDING,
    EXTENSION_EMAIL_OPTIONS_TO_API_EXTENSION_OPTIONS,
} from '../api-extension.constants';

export class ExtensionInfoAdapter {
    public extension: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public authId: string;
    public authPassword: string;
    public mobileNumber: string;
    public sipId: string;
    public outboundCallerId: string;
    public recordingType: ApiExtensionRecordingType;
    public isExtensionEnabled: boolean;
    public disableExternalCalls: string;
    public deliverAudio: string;
    public supportReinvite: string;
    public supportReplaces: string;
    public emailOptions: ApiExtensionEmailOptionsType;
    public voiceMailEnable: boolean;
    public voiceMailPin: string;
    public voiceMailPlayCallerId: boolean;
    public internal: boolean;
    public noAnswerTimeout: number;
    constructor(private readonly data: ExtensionInfoReply) {
        this.extension = data.extension;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.authId = data.authId;
        this.authPassword = data.authPassword;
        this.mobileNumber = data.mobileNumber;
        this.sipId = data.sipId;
        this.outboundCallerId = data.outboundCallerId;
        this.recordingType = EXTENSION_RECORDING_TO_API_EXTENSION_RECORDING[data.recordingType];
        this.isExtensionEnabled = data.isExtensionEnabled;
        this.disableExternalCalls = data.disableExternalCalls;
        this.deliverAudio = data.deliverAudio;
        this.supportReinvite = data.supportReinvite;
        this.supportReplaces = data.supportReplaces;
        this.emailOptions = EXTENSION_EMAIL_OPTIONS_TO_API_EXTENSION_OPTIONS[data.emailOptions];
        this.voiceMailEnable = data.voiceMailEnable;
        this.voiceMailPin = data.voiceMailPin;
        this.voiceMailPlayCallerId = data.voiceMailPlayCallerId;
        this.internal = data.internal;
        this.noAnswerTimeout = data.noAnswerTimeout;
    }

    public toPublicObject() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, ...publicProps } = this;
        return publicProps;
    }
}
