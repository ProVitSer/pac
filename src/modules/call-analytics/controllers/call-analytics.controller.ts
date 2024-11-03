import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { Role } from '@app/common/interfaces/enums';
import { CallAnaliticsService } from '../services/call-analitics.service';

@UseGuards(RoleGuard([Role.Admin, Role.User]))
@UseGuards(ProductGuard(ProductType.tts))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class CallAnaliticsController {
    constructor(private readonly callAnaliticsService: CallAnaliticsService) {}

    @Get()
    async getPbxCallStatistics() {
        return await this.callAnaliticsService.getAnaliticsData();
    }
}
