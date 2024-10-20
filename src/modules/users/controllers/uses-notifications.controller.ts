import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { UsersNotificationsService } from '../services/users-notofications.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';

@UseGuards(JwtAuthenticationGuard)
@Controller()
export class UsersNotificationsController {
    constructor(private readonly usersNotificationsService: UsersNotificationsService) {}

    @Get('notification/list')
    async notificationsCountList(@Req() req: RequestWithUser, @Query() query: { limit: string }) {
        return await this.usersNotificationsService.notificationsLimitList(query.limit);
    }

    @Post('notification/list')
    async notificationsList(@Req() req: RequestWithUser, @Body() data: { limit: string; offset?: string }) {
        return await this.usersNotificationsService.notificationsList(data.limit, data.offset);
    }

    @Put('notification/mark-read')
    async markReadNotification(@Req() req: RequestWithUser, @Body() data: { ids: number[] }) {
        return await this.usersNotificationsService.markReadNotification(data.ids);
    }

    @Put('notification/delete')
    async deleteNotification(@Req() req: RequestWithUser, @Body() data: { notificationId: number }) {
        return await this.usersNotificationsService.deleteNotification(data.notificationId);
    }
}
