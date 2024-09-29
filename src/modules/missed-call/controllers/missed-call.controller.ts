import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { MissedCallService } from '../services/missed-call.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import AddMissedCallConfig from '../dto/add-missed-call-config.dto';
import UpdateMissedCall from '../dto/update-missed-call.dto';

@UseGuards(JwtAuthenticationGuard)
@Controller()
export class MissedCallController {
    constructor(private readonly missedCallService: MissedCallService) {}

    @Get()
    async getMissedCallConfigList(@Req() req: RequestWithUser) {
        return this.missedCallService.getMissedCallConfigList(req.user.client.clientId);
    }

    @Get(':id')
    async getMissedCallConfigById(@Req() req: RequestWithUser, @Param('id') id: number) {
        return this.missedCallService.getMissedCallConfigById(req.user.client.clientId, id);
    }

    @Post()
    async addMissedCallConfig(@Req() req: RequestWithUser, @Body() data: AddMissedCallConfig) {
        return this.missedCallService.addMissedCallConfig(req.user.client.clientId, data);
    }

    @Get('/trunks/name')
    async getTrunkName(@Req() req: RequestWithUser) {
        return this.missedCallService.getTrunkName(req.user.client);
    }

    @Delete(':id')
    async deleteMissedCall(@Req() req: RequestWithUser, @Param('id') id: number) {
        return this.missedCallService.deleteMissedCall(req.user.client.clientId, id);
    }

    @Put()
    async updateMissedCall(@Req() request: RequestWithUser, @Body() data: UpdateMissedCall) {
        return this.missedCallService.updateMissedCall(request.user.client.clientId, data);
    }
}
