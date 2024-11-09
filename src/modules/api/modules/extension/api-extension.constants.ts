import {
    EmailOptionsType,
    ExtensionForwardStatus,
    ExtensionQueueStatus,
    ExtensionStateType,
    FwCallType,
    FwToType,
    RecordingType,
} from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.enum';
import {
    ApiExtensionEmailOptionsType,
    ApiExtensionForwardStatus,
    ApiExtensionFwCallType,
    ApiExtensionFwToType,
    ApiExtensionQueueStatus,
    ApiExtensionRecordingType,
    ApiExtensionStateType,
} from './interfaces/api-extension.enum';

export const EXTENSION_RECORDING_TO_API_EXTENSION_RECORDING: { [code in RecordingType]: ApiExtensionRecordingType } = {
    [RecordingType.RecordingOff]: ApiExtensionRecordingType.RecordingOff,
    [RecordingType.RecordingAll]: ApiExtensionRecordingType.RecordingAll,
    [RecordingType.RecordingExternal]: ApiExtensionRecordingType.RecordingExternal,
};

export const EXTENSION_EMAIL_OPTIONS_TO_API_EXTENSION_OPTIONS: { [code in EmailOptionsType]: ApiExtensionEmailOptionsType } = {
    [EmailOptionsType.None]: ApiExtensionEmailOptionsType.None,
    [EmailOptionsType.Notificatione]: ApiExtensionEmailOptionsType.Notificatione,
    [EmailOptionsType.Attachmente]: ApiExtensionEmailOptionsType.Attachmente,
    [EmailOptionsType.AttachmentAndDeletee]: ApiExtensionEmailOptionsType.AttachmentAndDeletee,
};

export const EXTENSION_FW_TO_API_FW: { [code in ExtensionForwardStatus]: ApiExtensionForwardStatus } = {
    [ExtensionForwardStatus.Available]: ApiExtensionForwardStatus.Available,
    [ExtensionForwardStatus.Away]: ApiExtensionForwardStatus.Away,
    [ExtensionForwardStatus.DND]: ApiExtensionForwardStatus.DND,
    [ExtensionForwardStatus.Lunch]: ApiExtensionForwardStatus.Lunch,
    [ExtensionForwardStatus.BusinessTrip]: ApiExtensionForwardStatus.BusinessTrip,
};

export const EXTENSION_API_FW_TO_GRPC_FW_TO: { [code in ApiExtensionFwToType]: FwToType } = {
    [ApiExtensionFwToType.Extension]: FwToType.Extension,
    [ApiExtensionFwToType.Queue]: FwToType.Queue,
    [ApiExtensionFwToType.IVR]: FwToType.IVR,
    [ApiExtensionFwToType.RingGroup]: FwToType.RingGroup,
    [ApiExtensionFwToType.Mobile]: FwToType.Mobile,
    [ApiExtensionFwToType.External]: FwToType.External,
    [ApiExtensionFwToType.VoiceMail]: FwToType.VoiceMail,
    [ApiExtensionFwToType.EndCall]: FwToType.EndCall,
};

export const EXTENSION_API_FW_STATUS_GRPC_FW_STATUS: { [code in ApiExtensionForwardStatus]: ExtensionForwardStatus } = {
    [ApiExtensionForwardStatus.Available]: ExtensionForwardStatus.Available,
    [ApiExtensionForwardStatus.Away]: ExtensionForwardStatus.Away,
    [ApiExtensionForwardStatus.DND]: ExtensionForwardStatus.DND,
    [ApiExtensionForwardStatus.Lunch]: ExtensionForwardStatus.Lunch,
    [ApiExtensionForwardStatus.BusinessTrip]: ExtensionForwardStatus.BusinessTrip,
};

export const EXTENSION_API_FW_CALL_GRPC_FW_CALL: { [code in ApiExtensionFwCallType]: FwCallType } = {
    [ApiExtensionFwCallType.ExternalCall]: FwCallType.ExternalCall,
    [ApiExtensionFwCallType.InternalCall]: FwCallType.InternalCall,
    [ApiExtensionFwCallType.BothCall]: FwCallType.BothCall,
};

export const EXTENSION_API_STATE_GRPC_EXT_STATE: { [code in ApiExtensionStateType]: ExtensionStateType } = {
    [ApiExtensionStateType.NoAnswer]: ExtensionStateType.NoAnswer,
    [ApiExtensionStateType.BusyNotRegistered]: ExtensionStateType.BusyNotRegistered,
};

export const EXTENSION_QUEUE_STATUS_TO_API_QUEUE_STATUS: { [code in ExtensionQueueStatus]: ApiExtensionQueueStatus } = {
    [ExtensionQueueStatus.LoggedIn]: ApiExtensionQueueStatus.LoggedIn,
    [ExtensionQueueStatus.LoggedOut]: ApiExtensionQueueStatus.LoggedOut,
};
