import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { TgUsersService } from '../services/tg-users.service';
import { TgUsers } from '../entities/tg-users.entity';
import CreatTgUser from '../dto/create-tg-user';
import DeleteTgUser from '../dto/delete-tg-user';
import UpdateTgUser from '../dto/update-tg-user';

@UseGuards(JwtAuthenticationGuard)
@Controller('users')
export class TgUsersController {
    constructor(private readonly tgUsersService: TgUsersService) {}

    @Get()
    async getTgUsers(@Req() request: RequestWithUser): Promise<TgUsers[]> {
        return this.tgUsersService.getTgUsers(request.user.client);
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