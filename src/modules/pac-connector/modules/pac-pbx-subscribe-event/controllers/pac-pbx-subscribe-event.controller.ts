import { Controller, Post } from '@nestjs/common';

@Controller('pac-connector/pac-pbx-subscribe-event')
export class PacPbxSubscribeEventController {
    @Post('delete')
    async deleteEvent(): Promise<void> {}
    @Post('update')
    async updateEvent(): Promise<void> {}
    @Post('insert')
    async insertEvent(): Promise<void> {}
}
