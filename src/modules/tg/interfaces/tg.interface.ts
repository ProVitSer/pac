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
    tgUserName: string;
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

export interface GetTgUsersQuery {
    page: string;
    pageSize: string;
    name?: string;
}

export interface GetTgUsersResult {
    data: TgUsersData[];
    totalRecords: number;
}

export interface TgUsersData {
    id: number;
    name: string;
    tgUserName: string;
    extension: string;
    date: string;
}
