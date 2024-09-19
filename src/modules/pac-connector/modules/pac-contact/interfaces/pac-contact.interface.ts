import { PlainObject } from '@app/common/interfaces/interfaces';

export interface GetContactInfoByIdRequest {
    contactId: string;
}

export interface ContactInfoDataReply {
    contactId: string;
    firstName: string;
    lastName: string;
    mobile: string;
    companyName: string;
    crmContactData: string;
    tag: string;
    mobileTwo: string;
    home: string;
    homeTwo: string;
    business: string;
    businessTwo: string;
    emailAddress: string;
    other: string;
    businessFax: string;
    homeFax: string;
    pager: string;
}

export interface UpdateContactInfoRequest {
    contactId: string;
    firstName?: PlainObject;
    lastName?: PlainObject;
    mobile?: PlainObject;
    companyName?: PlainObject;
    crmContactData?: PlainObject;
    tag?: PlainObject;
    mobileTwo?: PlainObject;
    home?: PlainObject;
    homeTwo?: PlainObject;
    business?: PlainObject;
    businessTwo?: PlainObject;
    emailAddress?: PlainObject;
    other?: PlainObject;
    businessFax?: PlainObject;
    homeFax?: PlainObject;
    pager?: PlainObject;
}

export interface GetContactListRequest {
    pageNumber: number;
    pageSize: number;
}

export interface ContactListReply {
    contacts: ContactInfoDataReply[];
    pageNumber: number;
    pageSize: number;
    totalCount: number;
}

export interface DeleteContactByIdRequest {
    contactId: string;
}
