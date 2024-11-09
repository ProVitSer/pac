import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { TgMessagesService } from '../services/tg-messages.service';
import { GetTgMessagesQuery } from '../interfaces/tg.interface';

@UseGuards(RoleGuard([Role.Admin, Role.Manager, Role.User]))
@UseGuards(ProductGuard(ProductType.telegram))
@UseGuards(JwtAuthenticationGuard)
@Controller('messages')
export class TgMessagesController {
    constructor(private readonly tgMessagesService: TgMessagesService) {}

    @Get()
    async getTgMessages(@Query() query: GetTgMessagesQuery) {
        return await this.tgMessagesService.getTgMessages(query);
    }
}
