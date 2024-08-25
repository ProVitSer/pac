import { TemplateTypes } from '@app/common/constants/templates';

interface TemplateVariables {
    [key: string]: string | number | unknown;
}

export type Contexts = TemplateVariables;

export interface SendMailData {
    to: string | string[];
    context: Contexts;
    template: TemplateTypes;
    from?: string;
    subject: string;
    attachments?: AttachmentsData[];
}

export interface AttachmentsData {
    path: string;
    filename: string;
}
