import { Client } from '@app/modules/client/entities/client.entity';
import { PacGrpcConnectorData } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { PacGrpcConnectorService } from '@app/modules/pac-connector/services/pac-grpc-connector.service';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ContactServiceMethods, ContactServiceName } from '../interfaces/pac-contact.enum';
import { CONTACT_PACKAGE, CONTACT_PROTO_PATH } from '../pac-contact.config';
import {
    GetContactInfoByIdRequest,
    ContactInfoDataReply,
    UpdateContactInfoRequest,
    ContactListReply,
    GetContactListRequest,
    DeleteContactByIdRequest,
} from '../interfaces/pac-contact.interface';

@Injectable()
export class PacContactService {
    constructor(private readonly pgcs: PacGrpcConnectorService) {}

    public async getContactInfoById(client: Client, data: GetContactInfoByIdRequest): Promise<ContactInfoDataReply> {
        return await this.grpcSend<GetContactInfoByIdRequest, ContactInfoDataReply>(client, data, ContactServiceMethods.GetContactInfoById);
    }

    public async updateContactInfoById(client: Client, data: UpdateContactInfoRequest): Promise<ContactInfoDataReply> {
        return await this.grpcSend<UpdateContactInfoRequest, ContactInfoDataReply>(
            client,
            data,
            ContactServiceMethods.UpdateContactInfoById,
        );
    }

    public async getContactList(client: Client, data: GetContactListRequest): Promise<ContactListReply> {
        return await this.grpcSend<GetContactListRequest, ContactListReply>(client, data, ContactServiceMethods.GetContactList);
    }

    public async deleteContactById(client: Client, data: DeleteContactByIdRequest): Promise<ContactInfoDataReply> {
        return await this.grpcSend<DeleteContactByIdRequest, ContactInfoDataReply>(client, data, ContactServiceMethods.DeleteContactById);
    }

    private async grpcSend<T, D>(client: Client, data: T, methodName: ContactServiceMethods): Promise<D> {
        const pacGrpcConnectorData: PacGrpcConnectorData<T> = {
            client,
            serviceName: ContactServiceName.ContactPbxService,
            methodName,
            data,
            package: CONTACT_PACKAGE,
            protoPath: CONTACT_PROTO_PATH,
        };

        return await firstValueFrom(await this.pgcs.callGrpcMethod<T, D>(pacGrpcConnectorData));
    }
}
