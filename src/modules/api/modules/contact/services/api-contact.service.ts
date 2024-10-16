import { Injectable } from '@nestjs/common';
import { PacContactService } from '@app/modules/pac-connector/modules/pac-contact/services/pac-contact.service';
import GetContactListDto from '../dto/get-contact-list.dto';
import { ContactInfoDataReply, ContactListReply } from '@app/modules/pac-connector/modules/pac-contact/interfaces/pac-contact.interface';
import UpdateContactDto from '../dto/update-contact.dto';
import { UpdateContactAdapter } from '../adapters/update-contract.adapter';

@Injectable()
export class ApiContactService {
    constructor(private readonly pacContactService: PacContactService) {}

    public async getContactList(clientId: number, data: GetContactListDto): Promise<ContactListReply> {
        const contactList = await this.pacContactService.getContactList(clientId, data);

        if (!contactList.contacts)
            return { contacts: [], pageNumber: contactList.pageNumber, pageSize: contactList.pageSize, totalCount: contactList.totalCount };

        return contactList;
    }

    public async getContactInfoById(clientId: number, contactId: string): Promise<ContactInfoDataReply> {
        const contact = await this.pacContactService.getContactInfoById(clientId, { contactId });

        return contact;
    }

    public async updateContactInfoById(clientId: number, data: UpdateContactDto): Promise<ContactInfoDataReply> {
        const contact = await this.getContactInfoById(clientId, data.contactId);

        const updateContractData = new UpdateContactAdapter(data, contact).toPublicObject();

        await this.pacContactService.updateContactInfoById(clientId, updateContractData);

        return this.getContactInfoById(clientId, data.contactId);
    }

    public async deleteContactById(clientId: number, contactId: string): Promise<void> {
        await this.pacContactService.deleteContactById(clientId, { contactId });
    }
}
