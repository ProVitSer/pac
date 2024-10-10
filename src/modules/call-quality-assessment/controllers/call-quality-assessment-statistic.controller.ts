import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { CallQualityAssessmentStatisticService } from '../services/call-quality-assessment-statistic.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { CallQualityAssessmentAddCallService } from '../services/call-quality-assessment-add-call.service';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('statistic')
export class CallQualityAssessmentStatisticController {
    constructor(
        private readonly cqas: CallQualityAssessmentStatisticService,
        private readonly cqaAddCallService: CallQualityAssessmentAddCallService,
    ) {}

    @Get()
    async getCqaStatistic(@Req() req: RequestWithUser) {
        return this.cqas.getCqaStatistic(req.user.client.clientId);
    }

    @Get('vox-add')
    async addCqasDataVox(
        @Req() req: RequestWithUser,
        @Query('clientId') clientId: number,
        @Query('number') number: string,
        @Query('exten') exten: string,
        @Query('uniqueid') uniqueid: string,
        @Query('rating') rating: string,
    ) {
        return this.cqaAddCallService.addCqasDataVox(req.user.client.clientId, {
            clientId,
            number,
            exten,
            uniqueid,
            rating,
        });
    }
}
