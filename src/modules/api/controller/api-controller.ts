import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { Role } from '@app/common/interfaces/enums';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { TokenService } from '@app/modules/auth/services/token.service';

@Controller()
export class AuthController {
    constructor(private readonly tokenService: TokenService) {}

    @UseGuards(RoleGuard([Role.Admin]))
    @UseGuards(JwtAuthenticationGuard)
    @Get('api-token')
    async getApiToken(@Req() request: RequestWithUser) {
        const { user } = request;

        return await this.tokenService.getApioken(user.id);
    }
}
