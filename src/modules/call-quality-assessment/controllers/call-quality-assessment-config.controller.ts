import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Permission, Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CallQualityAssessmentConfigService } from '../services/call-quality-assessment-config.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import UpdateCqaConfigkDto from '../dto/update-cqa-trunk.dto';
import { CqaFileType } from '../interfaces/call-quality-assessment.enum';
import ProductGuard from '@app/modules/auth/guards/product.guard';
import { ProductType } from '@app/modules/products/interfaces/products.enum';
import PermissionGuard from '@app/modules/auth/guards/permission.guard';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { Response } from 'express';

@UseGuards(RoleGuard([Role.Admin, Role.User]))
@UseGuards(ProductGuard(ProductType.cqa))
@UseGuards(JwtAuthenticationGuard)
@Controller('config')
export class CallQualityAssessmentConfigController {
    constructor(private readonly cqac: CallQualityAssessmentConfigService) {}

    @UseInterceptors(AnyFilesInterceptor())
    @UseGuards(PermissionGuard([Permission.Create]))
    @Post()
    async createCqaConfig(@Req() req: RequestWithUser, @UploadedFiles() files: Array<Express.Multer.File>): Promise<void> {
        const soundMain = files.find((file) => file.fieldname === CqaFileType.cqaMain);
        const soundGoodbye = files.find((file) => file.fieldname === CqaFileType.cqaGoodbye);

        await this.cqac.addCqacConfig({ client: req.user.client, soundMain, soundGoodbye });
    }

    @UseGuards(PermissionGuard([Permission.Read]))
    @Get()
    async getCqaClientConfig(@Req() req: RequestWithUser) {
        return this.cqac.getCqaConfig(req.user.client.clientId);
    }

    @UseGuards(PermissionGuard([Permission.Delete]))
    @Delete()
    async deleteCqaConfig(@Req() req: RequestWithUser) {
        return this.cqac.deleteCqacConfig(req.user.client);
    }

    @UseGuards(PermissionGuard([Permission.Update]))
    @Put('trunk')
    async updateCqacTrunkData(@Req() req: RequestWithUser, @Body() trunkData: UpdateCqaConfigkDto) {
        return this.cqac.updateTrunkData(req.user.client, trunkData);
    }

    @UseInterceptors(AnyFilesInterceptor())
    @UseGuards(PermissionGuard([Permission.Update]))
    @Put('files')
    async updateCqacAudioFiles(@Req() req: RequestWithUser, @UploadedFiles() files: Array<Express.Multer.File>) {
        const soundMain = files.find((file) => file.fieldname === CqaFileType.cqaMain);
        const soundGoodbye = files.find((file) => file.fieldname === CqaFileType.cqaGoodbye);

        await this.cqac.updateCqacAudioFiles({ client: req.user.client, soundMain, soundGoodbye });
    }

    @Get('file/:fileId')
    async getCqaVoiceFile(@Param('fileId') fileId: string, @Res() res: Response) {
        const cqaVoiceFile = await this.cqac.getCqaVoiceFile(fileId);

        const file = await FileUtilsService.readStreamVoiceFile(
            `${cqaVoiceFile.path}/${cqaVoiceFile.generatedFilePath}/${cqaVoiceFile.generatedFileName}`,
        );

        file.pipe(res);
    }

    @UseGuards(PermissionGuard([Permission.Update]))
    @Put('ai')
    async updateAi(@Req() req: RequestWithUser, @Body() data: { isAiEnabled: boolean }) {
        return this.cqac.updateAi(req.user.client, data.isAiEnabled);
    }
}
