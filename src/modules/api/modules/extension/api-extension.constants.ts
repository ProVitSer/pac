import {
    EmailOptionsType,
    ExtensionForwardStatus,
    ExtensionQueueStatus,
    RecordingType,
} from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.enum';
import {
    ApiExtensionEmailOptionsType,
    ApiExtensionForwardStatus,
    ApiExtensionQueueStatus,
    ApiExtensionRecordingType,
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

export const EXTENSION_QUEUE_STATUS_TO_API_QUEUE_STATUS: { [code in ExtensionQueueStatus]: ApiExtensionQueueStatus } = {
    [ExtensionQueueStatus.LoggedIn]: ApiExtensionQueueStatus.LoggedIn,
    [ExtensionQueueStatus.LoggedOut]: ApiExtensionQueueStatus.LoggedOut,
};
