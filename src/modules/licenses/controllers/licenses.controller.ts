import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { LicensesService } from '../services/licenses.service';
import CreateLicenseDto from '../dto/create-license.dto';
import CheckLicenseDto from '../dto/check-license.dto';
import DeactivateLicenseDto from '../dto/deactivate-license.dto';
import { Licenses } from '../entities/licenses.entity';
import LicenseCommercialDto from '../dto/license-commercial.dto';
import UpdateLicenseDto from '../dto/update-license.dto';
import ActivateLicenseDto from '../dto/activate-license.dto';
import { ActiveLicenseResponse } from '../interfaces/licenses.interface';

@Controller()
export class LicensesController {
    constructor(private readonly licensesService: LicensesService) {}

    @Get(':license')
    async getLicense(@Param('license') license: string): Promise<Licenses> {
        return this.licensesService.getLicense(license);
    }

    @Post()
    async createLicense(@Body() data: CreateLicenseDto): Promise<Licenses> {
        return this.licensesService.createLicense(data);
    }

    @Post('active')
    async isLicenseActive(@Body() data: CheckLicenseDto): Promise<ActiveLicenseResponse> {
        return this.licensesService.isLicenseActive(data);
    }

    @Put('activate')
    async activateLicense(@Body() data: ActivateLicenseDto): Promise<void> {
        return this.licensesService.activateLicense(data);
    }

    @Put('deactivate')
    async deactivateLicense(@Body() data: DeactivateLicenseDto): Promise<void> {
        return this.licensesService.deactivateLicense(data);
    }

    @Put('commercial')
    async setLicenseCommercial(@Body() data: LicenseCommercialDto): Promise<void> {
        return this.licensesService.setLicenseCommercial(data);
    }

    @Put()
    async updateLicense(@Body() data: UpdateLicenseDto): Promise<Licenses> {
        return this.licensesService.updateLicense(data);
    }
}
