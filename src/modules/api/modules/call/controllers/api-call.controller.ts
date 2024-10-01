import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiCallService } from '../services/api-call.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { ActiveCalls, ActiveConnectionsInfoData, CountCalls, CallResult } from '../interfaces/api-call.interface';
import MakeLocalCallDto from '../dto/make-local-call.dto';
import HangupCallDto from '../dto/hangup-call.dto';
import ApiJwtAuthenticationGuard from '@app/modules/auth/guards/api-jwt-authentication.guard';
import MakeExternalCallDto from '../dto/make-external-call.dto';
@UseGuards(RoleGuard([Role.API]))
@UseGuards(ApiJwtAuthenticationGuard)
@Controller('call')
export class ApiCallController {
    constructor(private readonly apiCallService: ApiCallService) {}

    @Get('active-calls')
    async getActiveCallInfo(@Req() req: RequestWithUser): Promise<ActiveCalls> {
        return this.apiCallService.getActiveCallInfo(req.user.client.clientId);
    }

    @Get('count-calls')
    async getCountCalls(@Req() req: RequestWithUser): Promise<CountCalls> {
        return this.apiCallService.getCountCalls(req.user.client.clientId);
    }

    @Post('make-local-call')
    async makeLocalCall(@Req() req: RequestWithUser, @Body() data: MakeLocalCallDto): Promise<CallResult> {
        return this.apiCallService.makeLocalCall(req.user.client.clientId, data);
    }

    @Post('make-external-call')
    async makeExternalCall(@Req() req: RequestWithUser, @Body() data: MakeExternalCallDto): Promise<void> {
        return this.apiCallService.makeExternalCall(req.user.client.clientId, data);
    }

    @Post('hangup-call')
    async hangupCall(@Req() req: RequestWithUser, @Body() data: HangupCallDto): Promise<CallResult> {
        return this.apiCallService.hangupCall(req.user.client.clientId, data);
    }

    @Get('active-connections')
    async getActiveConnections(@Req() req: RequestWithUser): Promise<ActiveConnectionsInfoData> {
        return this.apiCallService.getActiveConnections(req.user.client.clientId);
    }
}
