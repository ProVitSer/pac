import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import RegisterDto from '../dto/register.dto';
import { LocalAuthenticationGuard } from '../guards/local-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { TokenService } from '../services/token.service';
import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '../guards/role.guard';

@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
    ) {}

    @UseGuards(RoleGuard([Role.Admin]))
    @UseGuards(JwtAuthenticationGuard)
    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return await this.authService.register(registrationData);
    }

    @UseGuards(RoleGuard([Role.Admin]))
    @UseGuards(LocalAuthenticationGuard)
    @Post('api-token')
    async logIn(@Req() request: RequestWithUser) {
        const { user } = request;

        return await this.tokenService.getAccessToken(user.id);
    }
}
