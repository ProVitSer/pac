import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CdrService } from '../services/cdr.service';
import { GetCdrFiltersDto } from '../dto/get-cdr-filters.dto';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { ApplicationServiceType, Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class CdrController {
    constructor(private readonly cdrService: CdrService) {}

    @Get()
    async getCdrs() {
        return await this.cdrService.getCdrs();
    }

    @Get('filter')
    async getFilteredCdr(@Query() filters: GetCdrFiltersDto) {
        return await this.cdrService.getFilteredCdr(filters);
    }

    @Get('client/:client_id')
    async getCdrByClientId(@Param('client_id') client_id: number) {
        return this.cdrService.getCdrByClientId(client_id);
    }

    @Get('trunk/:applicationServiceType')
    async getCdrByTrunkType(@Param('applicationServiceType') applicationServiceType: ApplicationServiceType) {
        return this.cdrService.getCdrByTrunkType(applicationServiceType);
    }
}
