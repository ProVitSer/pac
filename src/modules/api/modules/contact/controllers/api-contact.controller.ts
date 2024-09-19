import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiContactService } from '../services/api-contact.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import GetContactListDto from '../dto/get-contact-list.dto';
import { ContactInfoDataReply, ContactListReply } from '@app/modules/pac-connector/modules/pac-contact/interfaces/pac-contact.interface';
import UpdateContactDto from '../dto/update-contact.dto';
import ApiJwtAuthenticationGuard from '@app/modules/auth/guards/api-jwt-authentication.guard';

@UseGuards(RoleGuard([Role.API]))
@UseGuards(ApiJwtAuthenticationGuard)
@Controller('contact')
export class ApiContactController {
    constructor(private readonly apiContactService: ApiContactService) {}

    @Post()
    async getContactList(@Req() request: RequestWithUser, @Body() data: GetContactListDto): Promise<ContactListReply> {
        return await this.apiContactService.getContactList(request.user.client, data);
    }

    @Get(':contactId')
    async getContactInfoById(@Req() request: RequestWithUser, @Param('contactId') contactId: string): Promise<ContactInfoDataReply> {
        return await this.apiContactService.getContactInfoById(request.user.client, contactId);
    }

    @Put()
    async updateContactInfoById(@Req() request: RequestWithUser, @Body() data: UpdateContactDto): Promise<ContactInfoDataReply> {
        return await this.apiContactService.updateContactInfoById(request.user.client, data);
    }

    @Delete(':contactId')
    async deleteContactById(@Req() request: RequestWithUser, @Param('contactId') contactId: string): Promise<void> {
        return await this.apiContactService.deleteContactById(request.user.client, contactId);
    }
}
