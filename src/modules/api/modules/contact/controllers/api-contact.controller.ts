import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiContactService } from '../services/api-contact.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import GetContactListDto from '../dto/get-contact-list.dto';
import { ContactInfoDataReply, ContactListReply } from '@app/modules/pac-connector/modules/pac-contact/interfaces/pac-contact.interface';
import UpdateContactDto from '../dto/update-contact.dto';
import ApiJwtAuthenticationGuard from '@app/modules/auth/guards/api-jwt-authentication.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(ProductGuard(ProductType.api))
@UseGuards(ApiJwtAuthenticationGuard)
@Controller('contact')
export class ApiContactController {
    constructor(private readonly apiContactService: ApiContactService) {}

    @Post()
    async getContactList(@Req() req: RequestWithUser, @Body() data: GetContactListDto): Promise<ContactListReply> {
        return await this.apiContactService.getContactList(req.user.client.clientId, data);
    }

    @Get(':contactId')
    async getContactInfoById(@Req() req: RequestWithUser, @Param('contactId') contactId: string): Promise<ContactInfoDataReply> {
        return await this.apiContactService.getContactInfoById(req.user.client.clientId, contactId);
    }

    @Put()
    async updateContactInfoById(@Req() req: RequestWithUser, @Body() data: UpdateContactDto): Promise<ContactInfoDataReply> {
        return await this.apiContactService.updateContactInfoById(req.user.client.clientId, data);
    }

    @Delete(':contactId')
    async deleteContactById(@Req() req: RequestWithUser, @Param('contactId') contactId: string): Promise<void> {
        return await this.apiContactService.deleteContactById(req.user.client.clientId, contactId);
    }
}
