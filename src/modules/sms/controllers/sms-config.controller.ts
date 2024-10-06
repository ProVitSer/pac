import { Body, Controller, Delete, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import CreateSmsConfig from '../dto/create-sms-config.dto';
import { SmsConfigService } from '../services/sms-config.service';
import { SmsConfig } from '../entities/sms-config.entity';
import UpdateSmsConfig from '../dto/update-sms-config.dto';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('config')
export class SmsConfigController {
    constructor(private readonly smsConfigService: SmsConfigService) {}

    @Post()
    async addSmsConfig(@Req() req: RequestWithUser, @Body() smsConfig: CreateSmsConfig) {
        return await this.smsConfigService.addSmsConfig(req.user.client.clientId, smsConfig);
    }

    @Get()
    async getSmsConfig(@Req() req: RequestWithUser): Promise<SmsConfig> {
        return this.smsConfigService.getSmsConfig(req.user.client.clientId);
    }

    @Delete()
    async deleteSmsConfig(@Req() req: RequestWithUser) {
        return this.smsConfigService.deleteSmsConfig(req.user.client.clientId);
    }

    @Put()
    async updateSmsConfig(@Req() req: RequestWithUser, @Body() updateData: UpdateSmsConfig) {
        return this.smsConfigService.updateSmsConfig(req.user.client.clientId, updateData);
    }
}
