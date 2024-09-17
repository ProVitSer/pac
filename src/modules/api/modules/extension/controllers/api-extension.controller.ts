import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { ApiExtensionService } from '../services/api-extension.service';
import { ExtensionInfo } from '../interfaces/api-extension.interface';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('extension')
export class ApiExtensionController {
    constructor(private readonly apiExtensionService: ApiExtensionService) {}

    @Get('extension-info/:extension')
    async getExtensionInfo(@Req() request: RequestWithUser, @Param('extension') extension: string): Promise<ExtensionInfo> {
        return await this.apiExtensionService.getExtensionInfo(request.user.client, extension);
    }
}
