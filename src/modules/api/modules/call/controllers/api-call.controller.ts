import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiCallService } from '../services/api-call.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { ActiveCalls, ActiveConnectionsInfoData, CountCalls, CallResult } from '../interfaces/api-call.interface';
import MakeCallDto from '../dto/make-call.dto';
import HangupCallDto from '../dto/hangup-call.dto';
import TransferCallDto from '../dto/transfer-call.dto';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('call')
export class ApiCallController {
    constructor(private readonly apiCallService: ApiCallService) {}

    @Get('active-calls')
    async getActiveCallInfo(@Req() request: RequestWithUser): Promise<ActiveCalls> {
        return this.apiCallService.getActiveCallInfo(request.user.client);
    }

    @Get('count-calls')
    async getCountCalls(@Req() request: RequestWithUser): Promise<CountCalls> {
        return this.apiCallService.getCountCalls(request.user.client);
    }

    @Post('make-call')
    async makeCall(@Req() request: RequestWithUser, @Body() data: MakeCallDto): Promise<CallResult> {
        return this.apiCallService.makeCall(request.user.client, data);
    }

    @Post('hangup-call')
    async hangupCall(@Req() request: RequestWithUser, @Body() data: HangupCallDto): Promise<CallResult> {
        return this.apiCallService.hangupCall(request.user.client, data);
    }

    @Get('active-connections')
    async getActiveConnections(@Req() request: RequestWithUser): Promise<ActiveConnectionsInfoData> {
        return this.apiCallService.getActiveConnections(request.user.client);
    }

    @Post('transfer-call')
    async transferCall(@Req() request: RequestWithUser, @Body() data: TransferCallDto): Promise<CallResult> {
        return this.apiCallService.transferCall(request.user.client, data);
    }
}