import { PlainObject } from '@app/common/interfaces/interfaces';
import {
    EmailOptionsType,
    ExtensionForwardStatus,
    ExtensionQueueStatus,
    ExtensionStateType,
    FwCallType,
    FwToType,
    RecordingType,
} from './pac-extension.enum';

export interface ExtensionsPbxService {
    getExtensionInfo(data: GetExtensionInfoRequest): Promise<ExtensionInfoReply>;
    getExtensionStatus(data: GetExtensionStatusRequest): Promise<ExtensionStatusReply>;
    getExtensions(): Promise<GetExtensionsReply>;
    getRegisteredExtensions(): Promise<GetRegisteredExtensionsReply>;
    getExtensionDeviceInfo(data: GetExtensionDeviceInfoRequest): Promise<GetExtensionDeviceInfoReply>;
    createExtension(data: CreateExtensionRequest): Promise<ExtensionInfoReply>;
    deleteExtension(data: DeleteExtensionRequest): Promise<DeleteExtensionReply>;
    updateExtensionInfo(data: UpdateExtensionInfoRequest): Promise<ExtensionInfoReply>;
    setExtensionForwardStatus(data: SetExtensionForwardStatusRequest): Promise<ExtensionInfoReply>;
    setExtensionGlobalQueuesStatus(data: SetExtensionGlobalQueuesStatusRequest): Promise<ExtensionInfoReply>;
    setExtensionStatusInQueue(data: SetExtensionStatusInQueueRequest): Promise<ExtensionInfoReply>;
    setExtensionCallForwardStatus(data: SetExtensionCallForwardStatusRequest): Promise<ExtensionInfoReply>;
}

export interface GetExtensionInfoRequest {
    extension: string;
}

export interface ExtensionInfoReply {
    extension: string;
    firstName: string;
    lastName: string;
    email: string;
    authId: string;
    authPassword: string;
    mobileNumber: string;
    sipId: string;
    outboundCallerId: string;
    recordingType: RecordingType;
    isExtensionEnabled?: boolean;
    disableExternalCalls: boolean;
    deliverAudio: string;
    supportReinvite: string;
    supportReplaces: string;
    emailOptions: EmailOptionsType;
    voiceMailEnable?: boolean;
    voiceMailPin: string;
    voiceMailPlayCallerId?: boolean;
    internal?: boolean;
    noAnswerTimeout?: number;
}

export interface GetExtensionStatusRequest {
    extension: string;
}

export interface ExtensionStatusReply {
    firstName: string;
    lastName: string;
    email: string;
    extension: string;
    registered: string;
    forwardingRulesStatus: ExtensionForwardStatus;
    queuesStatus: ExtensionQueueStatus;
    groups: string[];
    inRingGroups: string[];
    loggedInQueues: string[];
    devices: Device[];
}

export interface Device {
    userAgent: string;
    contact: string;
}

export interface GetExtensionsReply {
    extensions: string[];
}

export interface GetRegisteredExtensionsReply {
    extensions: string[];
}

export interface GetExtensionDeviceInfoRequest {
    extension: string;
}

export interface GetExtensionDeviceInfoReply {
    firstName: string;
    lastName: string;
    email: string;
    extension: string;
    devices: Device[];
}

export interface CreateExtensionRequest {
    extension: string;
    firstName: string;
    lastName: string;
    email: string;
    authId: string;
    authPassword: string;
    mobileNumber: string;
    outboundCallerId: string;
    recordingType: RecordingType;
    isExtensionEnabled: boolean;
    disableExternalCalls: boolean;
    deliverAudio: boolean;
    supportReinvite: boolean;
    supportReplaces: boolean;
}

export interface DeleteExtensionRequest {
    extension: string;
}

export interface DeleteExtensionReply {
    result: boolean;
}

export interface UpdateExtensionInfoRequest {
    extension: string;
    firstName: PlainObject;
    lastName: PlainObject;
    email: PlainObject;
    authId: PlainObject;
    authPassword: PlainObject;
    mobileNumber: PlainObject;
    outboundCallerId: PlainObject;
    recordingType: PlainObject;
    isExtensionEnabled: PlainObject;
    disableExternalCalls: PlainObject;
    deliverAudio: PlainObject;
    supportReinvite: PlainObject;
    supportReplaces: PlainObject;
}

export interface SetExtensionForwardStatusRequest {
    extension: string;
    fwStatus: ExtensionForwardStatus;
}

export interface SetExtensionGlobalQueuesStatusRequest {
    extension: string;
    status: ExtensionQueueStatus;
}

export interface SetExtensionStatusInQueueRequest {
    extension: string;
    queueNumber: string;
    status: ExtensionQueueStatus;
}

export interface SetExtensionCallForwardStatusRequest {
    extension: string;
    fwStatus: ExtensionForwardStatus;
    fwTo: FwToType;
    fwCall: FwCallType;
    extensionState?: ExtensionStateType;
    number: string;
}
