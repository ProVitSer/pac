import { CallDirection } from '@app/modules/call-event-handler/interfaces/call-event-handler.enum';
import { BitrixCallType, BitrixCallStatusType, CreateTaskType, Show } from './crm.enum';
import { FullCallInfo } from '@app/modules/call-event-handler/interfaces/call-event-handler.interface';

export interface CallRegisterData {
    bitrixId: string;
    phoneNumber: string;
    type: BitrixCallType;
    callTime: string;
}

export interface CallFinishData {
    callId: string;
    bitrixId: string;
    bilsec: number;
    callStatus: BitrixCallStatusType;
    callType: BitrixCallType;
    recording: string;
}

export interface CreateTaskData {
    bitrixId: number;
    incomingNumber: string;
}

export interface OnExternalCallStart {
    USER_ID: number;
    PHONE_NUMBER: string;
    CRM_ENTITY_TYPE: string;
    CRM_ENTITY_ID: number;
    CALL_LIST_ID: number;
    LINE_NUMBER: string;
    CALL_ID: string;
    IS_MOBILE: number;
}

export interface BitirxUserGet {
    result: {
        ID: string;
        ACTIVE: boolean;
        EMAIL: string;
        NAME: string;
        LAST_NAME: string;
        SECOND_NAME: string;
        PERSONAL_GENDER: string;
        PERSONAL_PROFESSION: string;
        PERSONAL_WWW: string;
        PERSONAL_BIRTHDAY: string;
        PERSONAL_PHOTO: string | null;
        PERSONAL_ICQ: string;
        PERSONAL_PHONE: string;
        PERSONAL_FAX: string;
        PERSONAL_MOBILE: string;
        PERSONAL_PAGER: string;
        PERSONAL_STREET: string;
        PERSONAL_CITY: string;
        PERSONAL_STATE: string;
        PERSONAL_ZIP: string;
        PERSONAL_COUNTRY: string;
        WORK_COMPANY: string;
        WORK_POSITION: string;
        WORK_PHONE: string;
        UF_DEPARTMENT: Array<number>;
        UF_INTERESTS: string | null;
        UF_SKILLS: string | null;
        UF_WEB_SITES: string | null;
        UF_XING: string | null;
        UF_LINKEDIN: string | null;
        UF_FACEBOOK: string | null;
        UF_TWITTER: string | null;
        UF_SKYPE: string | null;
        UF_DISTRICT: string | null;
        UF_PHONE_INNER: string;
        USER_TYPE: string;
    }[];
    next: number;
}

export interface BitrixRegisterCallRequest {
    USER_PHONE_INNER?: string;
    USER_ID: number | string;
    PHONE_NUMBER: string;
    CALL_START_DATE?: string;
    CRM_CREATE?: CreateTaskType;
    CRM_SOURCE?: string;
    CRM_ENTITY_TYPE?: number;
    SHOW?: Show;
    CALL_LIST_ID?: number;
    LINE_NUMBER?: string;
    TYPE: BitrixCallType;
}

export interface BitrixRegisterCallResponse {
    result: {
        CALL_ID: string;
        CRM_CREATED_LEAD: number;
        CRM_ENTITY_ID: number;
        CRM_ENTITY_TYPE: string;
        CRM_CREATED_ENTITIES: Array<string>;
        LEAD_CREATION_ERROR: string;
    };
}

export interface ExternalCallShow {
    CALL_ID: string;
    USER_ID: number | Array<string>;
}

export interface ExternalCallHide {
    CALL_ID: string;
    USER_ID: number | Array<string>;
}

export interface BitrixExternalCallFinishRequest {
    CALL_ID: string;
    USER_ID: string;
    DURATION: number;
    COST_CURRENCY?: string;
    STATUS_CODE?: BitrixCallStatusType;
    FAILED_REASON?: string;
    RECORD_URL?: string; // Старый метод передачи разговора, пока выпиливаем, переходим на attachRecord
    VOTE?: number;
    TYPE?: BitrixCallType;
    ADD_TO_CHAT?: number;
}
export interface BitrixTasksFields {
    fields: {
        ID?: number;
        PARENT_ID?: number;
        TITLE?: string;
        DESCRIPTION?: string;
        MARK?: string;
        PRIORITY?: string;
        STATUS?: string;
        MULTITASK?: string;
        NOT_VIEWED?: string;
        REPLICATE?: string;
        GROUP_ID?: number;
        STAGE_ID?: number;
        CREATED_BY?: number;
        CREATED_DATE?: Date;
        RESPONSIBLE_ID?: number;
        DEADLINE?: string;
    };
}

export interface BitrixFinishCallFields {
    CALL_ID: number;
    ID: number;
    CALL_TYPE: string;
    CALL_VOTE: string;
    COMMENT: string;
    PORTAL_USER_ID: number;
    PORTAL_NUMBER: string;
    PHONE_NUMBER: string;
    CALL_DURATION: string;
    CALL_START_DATE: string;
    COST: string;
    COST_CURRENCY: string;
    CALL_FAILED_CODE: string;
    CALL_FAILED_REASON: string;
    CRM_ACTIVITY_ID: number;
    CRM_ENTITY_ID: number;
    CRM_ENTITY_TYPE: string;
    REST_APP_ID: number;
    REST_APP_NAME: string;
    REDIAL_ATTEMPT: string;
    SESSION_ID: number;
    TRANSCRIPT_ID: number;
    TRANSCRIPT_PENDING: string;
    RECORD_FILE_ID: number;
}

export interface BitrixAttachRecord {
    CALL_ID: string;
    FILENAME: string;
    FILE_CONTENT?: string;
    RECORD_URL: string;
}

export interface BitrixActivityFields {
    fields: {
        ASSOCIATED_ENTITY_ID?: number;
        AUTHOR_ID?: number;
        AUTOCOMPLETE_RULE?: number;
        BINDINGS?: string;
        COMMUNICATIONS?: Array<any>;
        COMPLETED?: string;
        CREATED?: string;
        DEADLINE?: string;
        DESCRIPTION?: string;
        DESCRIPTION_TYPE?: string;
        DIRECTION?: string;
        EDITOR_ID?: number;
        END_TIME?: string;
        FILES?: string;
        ID?: number;
        LAST_UPDATE?: string;
        LOCATION?: string;
        NOTIFY_TYPE?: string;
        NOTIFY_VALUE?: number;
        ORIGINATOR_ID?: number;
        ORIGIN_ID?: string;
        ORIGIN_VERSION?: string;
        OWNER_ID?: number;
        OWNER_TYPE_ID?: number;
        PRIORITY?: string;
        PROVIDER_DATA?: string;
        PROVIDER_GROUP_ID?: number;
        PROVIDER_ID?: string;
        PROVIDER_TYPE_ID?: number;
        PROVIDER_PARAMS?: string;
        RESPONSIBLE_ID?: number;
        RESULT_CURRENCY_ID?: number;
        RESULT_MARK?: number;
        RESULT_SOURCE_ID?: number;
        RESULT_STATUS?: number;
        RESULT_STREAM?: number;
        RESULT_SUM?: string;
        RESULT_VALUE?: string;
        SETTINGS?: string;
        START_TIME?: string;
        STATUS?: string;
        SUBJECT?: string;
        TYPE_ID?: string;
        TYPE?: string;
        WEBDAV_ELEMENTS?: string;
    };
}

export interface CreateTaskResponse {
    task: {
        id: string;
        title: string;
        description: string;
        descriptionInBbcode: string;
        declineReason: string;
        priority: string;
        status: string;
        notViewed: string;
        statusComplete: string;
        multitask: string;
        stageId: string;
        responsibleId: string;
        responsibleName: string;
        responsibleLastName: string;
        responsibleSecondName: string;
        responsibleLogin: string;
        responsibleWorkPosition: string;
        deadline: string;
        deadlineOrig: string;
        createdBy: string;
        createdByName: string;
        createdByLastName: string;
        createdByLogin: string;
        createdDate: string;
        changedBy: string;
        changedDate: string;
        statusChangedBy: string;
        statusChangedDate: string;
        closedBy: string;
        closedDate: string;
    };
}

export interface GetTaskResponse {
    result: {
        task: {
            id: string;
            parentId: string;
            title: string;
            description: string;
            priority: string;
            status: string;
            responsibleId: string;
            deadline: string;
            createdBy: string;
            createdDate: string;
            changedBy: string;
            changedDate: string;
            statusChangedBy: string;
            statusChangedDate: string;
            closedBy: string;
            closedDate: string;
        };
    };
}

export interface GetActivity {
    ID: string;
    fields?: any;
}

export interface FinishCallInfo {
    unicueid: string;
    bitrixUserId: string;
    incomingNumber: string;
    callType: BitrixCallType;
    startTime: string;
    billsec: string;
    isAnswer: BitrixCallStatusType;
    recording: string;
}

export interface ExternalCallRegister {
    startCallTime: string;
    callType: BitrixCallType;
    number: string;
    user: string;
}

export interface RegisterCallInfo {
    crmUserId: number;
    phoneNumber: string;
    calltype: BitrixCallType;
    startCall: string;
    billsec: string;
    bitrixCallStatusType: BitrixCallStatusType;
    recording?: string | null;
}

export interface MissedCallToCrmData {
    clientId: number;
    trunkName: string;
    extension?: string;
    externalNumber: string;
}

export interface SearchContactData {
    filter: { [key: string]: string };
    select?: string[];
}

export interface CrmCallData {
    callDireciton: CallDirection;
    fullCallInfo: FullCallInfo;
    callId: number;
    clientId: number;
}

export interface BitrixAttachRecordResult {
    result: {
        uploadUrl: string;
        fieldName: string;
    };
}

export interface SearchClientByPhoneResult {
    result: SearchClientByPhoneData[];
}

export interface SearchClientByPhoneData {
    ID: string;
    NAME: string | null;
    LAST_NAME: string | null;
    ASSIGNED_BY_ID: string | null;
}

export interface OnExternalCallStart {
    event: string;
    event_handler_id: string;
    data: {
        PHONE_NUMBER: string;
        PHONE_NUMBER_INTERNATIONAL: string;
        EXTENSION: string;
        USER_ID: string;
        CALL_LIST_ID: string;
        LINE_NUMBER: string;
        IS_MOBILE: string;
        CALL_ID: string;
        CRM_ENTITY_TYPE: string;
        CRM_ENTITY_ID: string;
    };
    ts: string;
    auth: {
        domain: string;
        client_endpoint: string;
        server_endpoint: string;
        member_id: string;
        application_token: string;
    };
}
