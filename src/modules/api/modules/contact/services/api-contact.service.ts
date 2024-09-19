import { Client } from '@app/modules/client/entities/client.entity';
import { Injectable } from '@nestjs/common';
import { PacContactService } from '@app/modules/pac-connector/modules/pac-contact/services/pac-contact.service';
import GetContactListDto from '../dto/get-contact-list.dto';
import { ContactInfoDataReply, ContactListReply } from '@app/modules/pac-connector/modules/pac-contact/interfaces/pac-contact.interface';
import UpdateContactDto from '../dto/update-contact.dto';
import { UpdateContactAdapter } from '../adapters/update-contract.adapter';

@Injectable()
export class ApiContactService {
    constructor(private readonly pacContactService: PacContactService) {}

    public async getContactList(client: Client, data: GetContactListDto): Promise<ContactListReply> {
        const contactList = await this.pacContactService.getContactList(client, data);

        if (!contactList.contacts)
            return { contacts: [], pageNumber: contactList.pageNumber, pageSize: contactList.pageSize, totalCount: contactList.totalCount };

        return contactList;
    }

    public async getContactInfoById(client: Client, contactId: string): Promise<ContactInfoDataReply> {
        const contact = await this.pacContactService.getContactInfoById(client, { contactId });

        return contact;
    }

    public async updateContactInfoById(client: Client, data: UpdateContactDto): Promise<ContactInfoDataReply> {
        const contact = await this.getContactInfoById(client, data.contactId);

        const updateContractData = new UpdateContactAdapter(data, contact).toPublicObject();

        await this.pacContactService.updateContactInfoById(client, updateContractData);

        return this.getContactInfoById(client, data.contactId);
    }

    public async deleteContactById(client: Client, contactId: string): Promise<void> {
        await this.pacContactService.deleteContactById(client, { contactId });
    }
}
