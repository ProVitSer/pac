import { Body, Controller, Post, Req } from '@nestjs/common';
import { PacPbxSubscribeEventNotificationService } from '../services/pac-pbx-subscribe-event-notification.service';
import { Request } from 'express';
import { PbxEvenetActiveConnectionsInfo } from '../interfaces/pac-pbx-subscribe-event.interface';

@Controller('pac-connector/pac-pbx-subscribe-event')
export class PacPbxSubscribeEventController {
    constructor(private readonly ppsenService: PacPbxSubscribeEventNotificationService) {}

    @Post('delete')
    async deleteEvent(@Req() request: Request, @Body() data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        await this.ppsenService.test(request, data);
    }
    @Post('update')
    async updateEvent(@Req() request: Request, @Body() data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        await this.ppsenService.eventProcess(request, data);
    }
    @Post('insert')
    async insertEvent(@Req() request: Request, @Body() data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        await this.ppsenService.eventProcess(request, data);
    }
}
