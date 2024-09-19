export enum ApiExtensionRecordingType {
    RecordingOff = 'RecordingOff',
    RecordingAll = 'RecordingAll',
    RecordingExternal = 'RecordingExternal',
}

export enum ApiExtensionEmailOptionsType {
    None = 'None',
    Notificatione = 'Notificatione',
    Attachmente = 'Attachmente',
    AttachmentAndDeletee = 'AttachmentAndDeletee',
}

export enum ApiExtensionForwardStatus {
    Available = 'Available',
    Away = 'Away',
    DND = 'DND',
    Lunch = 'Lunch',
    BusinessTrip = 'BusinessTrip',
}

export enum ApiExtensionQueueStatus {
    LoggedIn = 'LoggedIn',
    LoggedOut = 'LoggedOut',
}

export enum ApiExtensionFwToType {
    Extension = 'Extension',
    Queue = 'Queue',
    IVR = 'IVR',
    RingGroup = 'RingGroup',
    Mobile = 'Mobile',
    External = 'External',
    VoiceMail = 'VoiceMail',
    EndCall = 'EndCall',
}

export enum ApiExtensionFwCallType {
    ExternalCall = 'ExternalCall',
    InternalCall = 'InternalCall',
    BothCall = 'BothCall',
}

export enum ApiExtensionStateType {
    NoAnswer = 'NoAnswer',
    BusyNotRegistered = 'BusyNotRegistered',
}
