import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import RegisterDto from '../dto/register.dto';
import { LocalAuthenticationGuard } from '../guards/local-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import LoginDto from '../dto/login.dto';
import JwtAuthenticationGuard from '../guards/jwt-authentication.guard';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() registrationData: RegisterDto) {
        return await this.authService.register(registrationData);
    }

    @UseGuards(LocalAuthenticationGuard)
    @Post('login')
    async logIn(@Body() data: LoginDto) {
        return await this.authService.login(data);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('logout')
    async logout(@Req() req: RequestWithUser) {
        return await this.authService.logout(req.user.id);
    }
}
