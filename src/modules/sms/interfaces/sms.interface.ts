import { ResponseFormat, SmscTranslit, Tinyurl, SmscErrorCode, SmscStatus, Alltype, CharsetType, DelSms, SmsSendStatus } from './sms.enum';

export interface SmscBaseData {
    login: string;
    psw: string;
    phones: string;
    id?: string;
    fmt?: ResponseFormat;
}

export interface SmscSendSmsData extends SmscBaseData {
    mes: string;
    sender?: string;
    translit?: SmscTranslit;
    tinyurl?: Tinyurl;
    time?: string;
    tz?: number;
    list?: string;
}
export interface SmscErrorResponse {
    error?: string;
    error_code?: SmscErrorCode;
}

export interface SmscSendSmsResponse extends SmscErrorResponse {
    cnt?: number;
    id?: string;
}

export interface SmscCheckSmsStatusResponse extends SmscErrorResponse {
    status?: SmscStatus;
    last_date?: string;
    last_timestamp?: string;
    flag?: string;
}

export interface SmscCheckSmsStatusParams extends Omit<SmscBaseData, 'phones'> {
    id: string;
    phone: string;
    all?: Alltype;
    charset?: CharsetType;
    del?: DelSms;
}

export interface CheckBalanceParams {
    login: string;
    psw: string;
    fmt?: ResponseFormat;
}

export interface CheckBalanceResponse extends SmscErrorResponse {
    balance?: string;
}
export interface SmsData {
    clientId: number;
    externalNumber: string;
    smsText: string;
}

export interface SendSmsData {
    externalNumber: string;
    sender: string;
    smsText: string;
    login: string;
    psw: string;
}

export interface CheckConnectionSmsResult {
    result: boolean;
}

export interface CheckAuthorisationData {
    login: string;
    psw: string;
}

export interface CheckStatusSendingSms {
    login: string;
    psw: string;
    smsId: string;
    phones: string;
}

export interface CheckSmsStatus {
    smsSendStatus: SmsSendStatus;
}
