import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { PacCallService } from '../services/pac-call.service';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('pac-connector/call')
export class PacCallController {
    constructor(private readonly pacCallService: PacCallService) {}

    @Get()
    async getActiveCallsInfo(@Req() request: RequestWithUser) {
        await this.pacCallService.getActiveCallsInfo(request.user.client);
    }
}
