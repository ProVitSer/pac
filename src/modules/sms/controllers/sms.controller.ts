import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { SmsService } from '../services/sms.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import SendSmsDto from '../dto/send-sms.dto';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { GetSmsStatisticQuery } from '../interfaces/sms.interface';

@UseGuards(RoleGuard([Role.Admin, Role.User]))
@UseGuards(ProductGuard(ProductType.sms))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class SmsController {
    constructor(private readonly smsService: SmsService) {}

    @Post()
    public async sendSms(@Req() req: RequestWithUser, @Body() smsData: SendSmsDto) {
        return await this.smsService.sendSms({ ...smsData, clientId: req.user.client.clientId });
    }

    @Get()
    async getTgMessages(@Query() query: GetSmsStatisticQuery) {
        return await this.smsService.getSmsStatistic(query);
    }
}
