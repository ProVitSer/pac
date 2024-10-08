import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { CrmConfigService } from '../services/crm-config.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import AddCrmConfig from '../dto/add-crm-config.dto';
import UpdateCrmConfig from '../dto/update-crm-config.dto';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('config')
export class CrmConfigController {
    constructor(private readonly crmConfigService: CrmConfigService) {}

    @Post()
    async addCrmConfig(@Req() req: RequestWithUser, @Body() crmConfig: AddCrmConfig) {
        return await this.crmConfigService.addCrmConfig(req.user.client.clientId, crmConfig);
    }

    @Get()
    async getCrmConfig(@Req() req: RequestWithUser) {
        return this.crmConfigService.getCrmConfig(req.user.client.clientId);
    }

    @Delete()
    async deleteCrmConfig(@Req() req: RequestWithUser) {
        return this.crmConfigService.deleteCrmConfig(req.user.client.clientId);
    }

    @Put()
    async updateCrmConfig(@Req() req: RequestWithUser, @Body() updateData: UpdateCrmConfig) {
        return this.crmConfigService.updateCrmConfig(req.user.client.clientId, updateData);
    }
}
