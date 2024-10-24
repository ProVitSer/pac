export interface AddTgMessageData {
    clientId: number;
    externalNumber: string;
    messageId: string;
    message: string;
    tgConfigId: number;
}

export interface GetTgMessagesResult {
    data: TgMessagesData[];
    totalRecords: number;
}

export interface TgMessagesData {
    messageId: string;
    name: string;
    userName: string;
    externalNumber: string;
    localExtension: string;
    message: string;
    tgUserId: string;
    date: string;
}

export interface GetTgMessagesQuery {
    page: string;
    pageSize: string;
    dateString?: string;
    phoneNumber?: string;
}
