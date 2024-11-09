import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import { Role } from '@app/common/interfaces/enums';
import { CallAnaliticsService } from '../services/call-analitics.service';
import { GetCdrQuery } from '../interfaces/call-analytics.interface';
import { CallCdrService } from '../services/call-cdr.service';

@UseGuards(RoleGuard([Role.Admin, Role.User]))
@UseGuards(ProductGuard(ProductType.tts))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class CallAnaliticsController {
    constructor(
        private readonly callAnaliticsService: CallAnaliticsService,
        private readonly callCdrService: CallCdrService,
    ) {}

    @Get('analitic')
    async getAnaliticsData() {
        return await this.callAnaliticsService.getAnaliticsData();
    }

    @Get('cdr')
    async getCdr(@Query() query: GetCdrQuery) {
        return await this.callCdrService.getCdr(query);
    }

    @Get('cdr/call/:callId')
    async getCallData(@Param('callId') callId: string) {
        return await this.callCdrService.getCallData(Number(callId));
    }
}
