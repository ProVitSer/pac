import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Permission, Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { CallQualityAssessmentStatisticService } from '../services/call-quality-assessment-statistic.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { CallQualityAssessmentAddCallService } from '../services/call-quality-assessment-add-call.service';
import { CallResult } from '../interfaces/call-quality-assessment.enum';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import PermissionGuard from '@app/modules/auth/guards/permission.guard';
import { GetCqaStatisticQuery } from '../interfaces/call-quality-assessment.interface';

@UseGuards(RoleGuard([Role.Admin, Role.User]))
@UseGuards(ProductGuard(ProductType.cqa))
@UseGuards(JwtAuthenticationGuard)
@Controller('statistic')
export class CallQualityAssessmentStatisticController {
    constructor(
        private readonly cqas: CallQualityAssessmentStatisticService,
        private readonly cqaAddCallService: CallQualityAssessmentAddCallService,
    ) {}

    @UseGuards(PermissionGuard([Permission.Read]))
    @Get()
    async getCqaStatistic(@Req() req: RequestWithUser, @Query() query: GetCqaStatisticQuery) {
        return this.cqas.getCqaStatistic(query);
    }

    @Get('vox-add')
    async addCqasDataVox(
        @Req() req: RequestWithUser,
        @Query('clientId') clientId: number,
        @Query('number') number: string,
        @Query('exten') exten: string,
        @Query('uniqueid') uniqueid: string,
        @Query('channelId') channelId: string,
        @Query('rating') rating: string,
        @Query('callResult') callResult: CallResult,
    ) {
        return this.cqaAddCallService.addCqasDataVox(req.user.client.clientId, {
            clientId,
            number,
            exten,
            uniqueid,
            channelId,
            rating,
            callResult,
        });
    }
}
