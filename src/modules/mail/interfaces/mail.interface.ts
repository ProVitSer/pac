import { TemplateTypes } from '../../../common/constants/templates';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface TemplateVariables {
    [key: string]: string | number | unknown;
}

export type Contexts = LicenseCreateContext | LicenseDeactivateContext | LicenseExpireContext | ChangeTrunkStatusContext | ResetPassword;

export interface LicenseCreateContext {
    fio: string;
    expiration_date: string;
    license: string;
}

export interface LicenseDeactivateContext extends LicenseCreateContext {}

export interface LicenseExpireContext extends LicenseCreateContext {
    expiration_day: string;
}

export interface SendMailData<T> {
    to: string | string[];
    context: T;
    template: TemplateTypes;
    from?: string;
    subject: string;
    attachments?: AttachmentsData[];
}

export interface AttachmentsData {
    path: string;
    filename: string;
}

export interface ChangeTrunkStatusContext {
    fio: string;
    trinkId: string;
    trunkStatusDescription: string;
}

export interface ResetPassword {
    url: string;
}
