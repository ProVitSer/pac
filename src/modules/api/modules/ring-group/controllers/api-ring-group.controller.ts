import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiRingGroupService } from '../services/api-ring-group.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { RingGroupListReply } from '@app/modules/pac-connector/modules/pac-ring-group/interfaces/pac-ring-group.interface';
import { RingGroupMembers } from '../interfaces/api-ring-group.interface';
import ModifyRingGroupDto from '../dto/modify-ring-group.dto';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('ring-group')
export class ApiRingGroupController {
    constructor(private readonly apiRingGroupService: ApiRingGroupService) {}

    @Get()
    async getRingGroupList(@Req() request: RequestWithUser): Promise<RingGroupListReply> {
        return await this.apiRingGroupService.getRingGroupList(request.user.client);
    }

    @Get('members/:ringGroupNumber')
    async getRingGroupMembers(
        @Req() request: RequestWithUser,
        @Param('ringGroupNumber') ringGroupNumber: string,
    ): Promise<RingGroupMembers> {
        return await this.apiRingGroupService.getRingGroupMembers(request.user.client, ringGroupNumber);
    }

    @Put('members')
    async addMemberInRingGroup(@Req() request: RequestWithUser, @Body() data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        return await this.apiRingGroupService.addMemberInRingGroup(request.user.client, data);
    }

    @Delete('members')
    async deleteMemberInRingGroup(@Req() request: RequestWithUser, @Body() data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        return await this.apiRingGroupService.deleteMemberInRingGroup(request.user.client, data);
    }
}
