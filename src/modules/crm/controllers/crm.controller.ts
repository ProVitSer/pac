import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';

@Controller('call')
export class CrmController {
    constructor() {}

    @Post()
    async initCallFromCrm(@Req() req: any, @Body() iniCallInfo: any) {}
}
