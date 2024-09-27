import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { CallQualityAssessmentStatisticService } from '../services/call-quality-assessment-statistic.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('statistic')
export class CallQualityAssessmentStatisticController {
    constructor(private readonly cqas: CallQualityAssessmentStatisticService) {}

    @Get()
    async getCqaStatistic(@Req() req: RequestWithUser) {
        return this.cqas.getCqaStatistic(req.user.client);
    }
}
