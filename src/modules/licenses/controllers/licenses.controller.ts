import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { LicensesService } from '../services/licenses.service';
import CreateLicenseDto from '../dto/create-license.dto';
import DeactivateLicenseDto from '../dto/deactivate-license.dto';
import { Licenses } from '../entities/licenses.entity';
import LicenseCommercialDto from '../dto/license-commercial.dto';
import UpdateLicenseDto from '../dto/update-license.dto';
import ActivateLicenseDto from '../dto/activate-license.dto';
import { ActiveLicenseResponse } from '../interfaces/licenses.interface';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { Role } from '@app/common/interfaces/enums';
import { RequestWithUser } from '@app/common/interfaces/interfaces';

@UseGuards(JwtAuthenticationGuard)
@Controller()
export class LicensesController {
    constructor(private readonly licensesService: LicensesService) {}

    @Get()
    async getLicenseInfo(@Req() request: RequestWithUser): Promise<Licenses> {
        const { user } = request;

        return this.licensesService.getLicenseInfo(user.client.licenses.license);
    }

    @UseGuards(RoleGuard([Role.Admin]))
    @Post()
    async createLicense(@Body() data: CreateLicenseDto): Promise<Licenses> {
        return this.licensesService.createLicense(data);
    }

    @UseGuards(RoleGuard([Role.Admin]))
    @Post('active')
    async isLicenseActive(@Req() request: RequestWithUser): Promise<ActiveLicenseResponse> {
        return this.licensesService.isLicenseActive(request.user.client.licenses);
    }

    @UseGuards(RoleGuard([Role.Admin]))
    @Put('activate')
    async activateLicense(@Body() data: ActivateLicenseDto): Promise<void> {
        return this.licensesService.activateLicense(data);
    }

    @UseGuards(RoleGuard([Role.Admin]))
    @Put('deactivate')
    async deactivateLicense(@Body() data: DeactivateLicenseDto): Promise<void> {
        return this.licensesService.deactivateLicense(data);
    }

    @UseGuards(RoleGuard([Role.Admin, Role.Manager]))
    @Put('commercial')
    async setLicenseCommercial(@Body() data: LicenseCommercialDto): Promise<void> {
        return this.licensesService.setLicenseCommercial(data);
    }

    @UseGuards(RoleGuard([Role.Admin]))
    @Put()
    async updateLicense(@Body() data: UpdateLicenseDto): Promise<Licenses> {
        return this.licensesService.updateLicense(data);
    }
}
