import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { SmsService } from '../services/sms.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import SendSmsDto from '../dto/send-sms.dto';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @Post()
    public async sendSms(@Req() req: RequestWithUser, @Body() smsData: SendSmsDto) {
        return await this.smsService.sendSms({ ...smsData, clientId: req.user.client.clientId });
    }
}
