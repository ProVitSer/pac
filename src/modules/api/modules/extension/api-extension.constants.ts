import { EmailOptionsType, RecordingType } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.enum';
import { ApiExtensionEmailOptionsType, ApiExtensionRecordingType } from './interfaces/api-extension.enum';

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
