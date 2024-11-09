import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import ForgotPassword from '../dto/forgot-password.dto';
import ResetPassword from '../dto/reset-password.dto';
import { UsersService } from '../services/users.service';
import UpdateUserDto from '../dto/update-user.dto';
import ChangeUserPasswordDto from '../dto/change-user-password.dto';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import CheckVerificationCodeDto from '../dto/check-verification-code.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('forgot-password')
    async forgotPassword(@Body() data: ForgotPassword) {
        return await this.usersService.forgotPassword(data);
    }

    @Post('reset-password')
    async resetPassword(@Body() data: ResetPassword) {
        return await this.usersService.resetPassword(data);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Get(':userId')
    async getUserInfo(@Param('userId') userId: number) {
        return this.usersService.getUserInfo(userId);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Put()
    async updateUserInfo(@Req() req: RequestWithUser, @Body() userData: UpdateUserDto) {
        return this.usersService.updateUser(req.user, userData);
    }

    @UseGuards(JwtAuthenticationGuard)
    @Post('change-password')
    async changePassword(@Body() data: ChangeUserPasswordDto) {
        return this.usersService.changePassword(data);
    }

    @Post('check-verification-code')
    async checkVerificationCode(@Body() data: CheckVerificationCodeDto) {
        return await this.usersService.checkVerificationCode(data.verificationCode);
    }
}
