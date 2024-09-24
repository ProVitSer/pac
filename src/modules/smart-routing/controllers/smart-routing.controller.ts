import { Role } from '@app/common/interfaces/enums';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { Controller, UseGuards } from '@nestjs/common';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class SmartRoutingController {
    constructor() {}
}
