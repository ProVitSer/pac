import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { SoftwareDistributionService } from '../services/software-distribution.service';

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
