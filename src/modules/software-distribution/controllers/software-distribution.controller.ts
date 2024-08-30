import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { SoftwareDistributionService } from '../services/software-distribution.service';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class SoftwareDistributionController {
    constructor(private readonly softDistService: SoftwareDistributionService) {}

    @Get('installer')
    downloadInstallPack(@Res() res: Response) {
        const fileStream = this.softDistService.downloadInstallPack(res);
        fileStream.pipe(res);
    }

    @Get('programm')
    downloadDistrib(@Query('os') os: string, @Res() res: Response) {
        const fileStream = this.softDistService.downloadDistrib(os, res);
        fileStream.pipe(res);
    }
}
