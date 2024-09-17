export enum ExtensionServiceName {
    ExtensionsPbxService = 'ExtensionsPbxService',
}

export enum ExtensionServiceMethods {
    GetExtensionInfo = 'GetExtensionInfo',
    GetExtensionStatus = 'GetExtensionStatus',
    GetExtensions = 'GetExtensions',
    GetRegisteredExtensions = 'GetRegisteredExtensions',
    GetExtensionDeviceInfo = 'GetExtensionDeviceInfo',
    CreateExtension = 'CreateExtension',
    DeleteExtension = 'DeleteExtension',
    UpdateExtensionInfo = 'CreUpdateExtensionInfoateExtension',
    SetExtensionForwardStatus = 'SetExtensionForwardStatus',
    SetExtensionGlobalQueuesStatus = 'SetExtensionGlobalQueuesStatus',
    SetExtensionStatusInQueue = 'SetExtensionStatusInQueue',
    SetExtensionCallForwardStatus = 'SetExtensionCallForwardStatus',
}

export enum RecordingType {
    RecordingOff,
    RecordingAll,
    RecordingExternal,
}

export enum EmailOptionsType {
    None,
    Notificatione,
    Attachmente,
    AttachmentAndDeletee,
}

export enum ExtensionForwardStatus {
    Available,
    Away,
    DND,
    Lunch,
    BusinessTrip,
}

export enum ExtensionQueueStatus {
    LoggedIn,
    LoggedOut,
}

export enum FwToType {
    Extension,
    Queue,
    IVR,
    RingGroup,
    Mobile,
    External,
    VoiceMail,
    EndCall,
}

export enum FwCallType {
    ExternalCall,
    InternalCall,
    BothCall,
}

export enum ExtensionStateType {
    NoAnswer,
    BusyNotRegistered,
}
