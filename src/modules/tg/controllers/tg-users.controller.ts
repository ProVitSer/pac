import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { TgUsersService } from '../services/tg-users.service';
import { TgUsers } from '../entities/tg-users.entity';
import CreatTgUser from '../dto/create-tg-user';
import DeleteTgUser from '../dto/delete-tg-user';
import UpdateTgUser from '../dto/update-tg-user';
import { Role } from '@app/common/interfaces/enums';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { GetTgUsersQuery } from '../interfaces/tg.interface';
@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(ProductGuard(ProductType.telegram))
@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class TgUsersController {
    constructor(private readonly tgUsersService: TgUsersService) {}

    @Get()
    async getTgUsers(@Req() request: RequestWithUser, @Query() query: GetTgUsersQuery) {
        return this.tgUsersService.getTgUsers(request.user.client, query);
    }

    @Post()
    async createTgUser(@Req() request: RequestWithUser, @Body() data: CreatTgUser): Promise<void> {
        return this.tgUsersService.createTgUser(request.user.client, data);
    }

    @Delete()
    async deleteTgUser(@Req() request: RequestWithUser, @Body() data: DeleteTgUser) {
        return this.tgUsersService.deleteTgUser(request.user.client, data);
    }

    @Put()
    async updateTgUser(@Req() request: RequestWithUser, @Body() data: UpdateTgUser): Promise<TgUsers> {
        return this.tgUsersService.updateTgUser(request.user.client, data);
    }
}
