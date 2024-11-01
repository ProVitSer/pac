import { Body, Controller, Delete, Get, Param, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { Role } from '@app/common/interfaces/enums';
import { CallAnaliticsService } from '../services/call-analitics.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';

@UseGuards(RoleGuard([Role.Admin, Role.User]))
@UseGuards(ProductGuard(ProductType.tts))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class CallAnaliticsController {
    constructor(private readonly callAnaliticsService: CallAnaliticsService) {}

    @Get()
    async getPbxCallStatistics(@Req() req: RequestWithUser) {
        return await this.callAnaliticsService.getPbxExtensionStatistics(req.user.client.clientId);
    }
}
