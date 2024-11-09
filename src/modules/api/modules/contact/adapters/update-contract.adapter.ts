import { ContactInfoDataReply } from '@app/modules/pac-connector/modules/pac-contact/interfaces/pac-contact.interface';
import UpdateContactDto from '../dto/update-contact.dto';
import { PlainObject } from '@app/common/interfaces/interfaces';

export class UpdateContactAdapter {
    public contactId: string;
    public firstName: PlainObject;
    public lastName: PlainObject;
    public mobile: PlainObject;
    public companyName: PlainObject;
    public crmContactData: PlainObject;
    public tag: PlainObject;
    public mobileTwo: PlainObject;
    public home: PlainObject;
    public homeTwo: PlainObject;
    public business: PlainObject;
    public businessTwo: PlainObject;
    public emailAddress: PlainObject;
    public other: PlainObject;
    public businessFax: PlainObject;
    public homeFax: PlainObject;
    public pager: PlainObject;
    constructor(data: UpdateContactDto, contact: ContactInfoDataReply) {
        console.log(data);
        this.contactId = data.contactId;
        this.firstName = data.firstName ? { value: data.firstName } : { value: contact.firstName };
        this.lastName = data.lastName ? { value: data.lastName } : { value: contact.lastName };
        this.mobile = data.mobile ? { value: data.mobile } : { value: contact.mobile };
        this.companyName = data.companyName ? { value: data.companyName } : { value: contact.companyName };
        this.crmContactData = data.crmContactData ? { value: data.crmContactData } : { value: contact.crmContactData };
        this.tag = data.tag ? { value: data.tag } : { value: contact.tag };
        this.mobileTwo = data.mobileTwo ? { value: data.mobileTwo } : { value: contact.mobileTwo };
        this.home = data.home ? { value: data.home } : { value: contact.home };
        this.homeTwo = data.homeTwo ? { value: data.homeTwo } : { value: contact.homeTwo };
        this.business = data.business ? { value: data.business } : { value: contact.business };
        this.businessTwo = data.businessTwo ? { value: data.businessTwo } : { value: contact.businessTwo };
        this.emailAddress = data.emailAddress ? { value: data.emailAddress } : { value: contact.emailAddress };
        this.other = data.other ? { value: data.other } : { value: contact.other };
        this.businessFax = data.businessFax ? { value: data.businessFax } : { value: contact.businessFax };
        this.homeFax = data.homeFax ? { value: data.homeFax } : { value: contact.homeFax };
        this.pager = data.pager ? { value: data.pager } : { value: contact.pager };
    }

    public toPublicObject() {
        return this;
    }
}
