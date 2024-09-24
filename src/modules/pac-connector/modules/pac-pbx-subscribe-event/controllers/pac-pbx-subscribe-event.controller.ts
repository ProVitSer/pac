import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { PacPbxSubscribeEventNotificationService } from '../services/pac-pbx-subscribe-event-notification.service';
import { PbxEvenetActiveConnectionsInfo } from '../interfaces/pac-pbx-subscribe-event.interface';
import { PacCheckGuard } from '@app/modules/pac-connector/guards/pac-check.guard';
import { RequestWithPacInfo } from '@app/modules/pac-connector/interfaces/pac-connector.interface';

@UseGuards(PacCheckGuard)
@Controller('pac-connector/pac-pbx-subscribe-event')
export class PacPbxSubscribeEventController {
    constructor(private readonly ppsenService: PacPbxSubscribeEventNotificationService) {}

    @Post('delete')
    async deleteEvent(@Req() request: RequestWithPacInfo, @Body() data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        this.ppsenService.deleteEventProcess(request, data);
    }
    @Post('update')
    async updateEvent(@Req() request: RequestWithPacInfo, @Body() data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        this.ppsenService.updateEventProcess(request, data);
    }

    @Post('insert')
    async insertEvent(@Req() request: RequestWithPacInfo, @Body() data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        this.ppsenService.insertEventProcess(request, data);
    }
}
