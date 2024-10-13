import { Role } from '@app/common/interfaces/enums';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { Body, Controller, Delete, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { SmartRoutingService } from '../services/smart-routing.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import DeleteSmartRouting from '../dto/delete-smart-routing.dto';
import AddSmartRouting from '../dto/add-smart-routing.dto';
import UpdateSmartRouting from '../dto/update-smart-routing.dto';
import { SmartRoutingProvidersService } from '../services/smart-routing-providers.service';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class SmartRoutingController {
    constructor(
        private readonly smartRoutingService: SmartRoutingService,
        private readonly smartRoutingProvidersService: SmartRoutingProvidersService,
    ) {}

    @Get('pbx-extension')
    async getPbxExtension(@Req() req: RequestWithUser) {
        return this.smartRoutingService.getPbxExtension(req.user.client.clientId);
    }

    @Get()
    async getSmartRouting(@Req() req: RequestWithUser) {
        return this.smartRoutingService.getSmartRouting(req.user.client.clientId);
    }

    @Delete()
    async deleteSmartRoutingById(@Req() req: RequestWithUser, @Body() data: DeleteSmartRouting) {
        return this.smartRoutingService.deleteSmartRoutingById(req.user.client.clientId, data);
    }

    @Post()
    async addSmartRouting(@Req() req: RequestWithUser, @Body() data: AddSmartRouting) {
        return this.smartRoutingService.addSmartRouting(req.user.client.clientId, data);
    }

    @Put()
    async updateSmartRouting(@Req() req: RequestWithUser, @Body() data: UpdateSmartRouting) {
        return this.smartRoutingService.updateSmartRouting(req.user.client.clientId, data);
    }

    @Get('vox-provider')
    async getProviderSmartRouting(@Req() req: RequestWithUser, @Query('externalNumber') externalNumber: string) {
        return await this.smartRoutingProvidersService.voxGetRoutingInfo(req.user.client.clientId, externalNumber);
    }
}
