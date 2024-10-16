import { Body, Controller, Delete, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApiRingGroupService } from '../services/api-ring-group.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { RingGroupListReply } from '@app/modules/pac-connector/modules/pac-ring-group/interfaces/pac-ring-group.interface';
import { RingGroupMembers } from '../interfaces/api-ring-group.interface';
import ModifyRingGroupDto from '../dto/modify-ring-group.dto';
import ApiJwtAuthenticationGuard from '@app/modules/auth/guards/api-jwt-authentication.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(ProductGuard(ProductType.api))
@UseGuards(ApiJwtAuthenticationGuard)
@Controller('ring-group')
export class ApiRingGroupController {
    constructor(private readonly apiRingGroupService: ApiRingGroupService) {}

    @Get()
    async getRingGroupList(@Req() req: RequestWithUser): Promise<RingGroupListReply> {
        return await this.apiRingGroupService.getRingGroupList(req.user.client.clientId);
    }

    @Get('members/:ringGroupNumber')
    async getRingGroupMembers(@Req() req: RequestWithUser, @Param('ringGroupNumber') ringGroupNumber: string): Promise<RingGroupMembers> {
        return await this.apiRingGroupService.getRingGroupMembers(req.user.client.clientId, ringGroupNumber);
    }

    @Put('members')
    async addMemberInRingGroup(@Req() req: RequestWithUser, @Body() data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        return await this.apiRingGroupService.addMemberInRingGroup(req.user.client.clientId, data);
    }

    @Delete('members')
    async deleteMemberInRingGroup(@Req() req: RequestWithUser, @Body() data: ModifyRingGroupDto): Promise<RingGroupMembers> {
        return await this.apiRingGroupService.deleteMemberInRingGroup(req.user.client.clientId, data);
    }
}
