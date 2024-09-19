import { Body, Controller, Delete, Get, Post, Put, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import CreateCqaConfigkDto from '../dto/create-cqa-config.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CallQualityAssessmentConfigService } from '../services/call-quality-assessment-config.service';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import UpdateCqaConfigkDto from '../dto/update-cqa-trunk.dto';
import { CqaFileType } from '../interfaces/call-quality-assessment.enum';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('config')
export class CallQualityAssessmentConfigController {
    constructor(private readonly cqac: CallQualityAssessmentConfigService) {}

    @UseInterceptors(AnyFilesInterceptor())
    @Post()
    async createCqaConfig(
        @Req() req: RequestWithUser,
        @Body() data: CreateCqaConfigkDto,
        @UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<void> {
        const soundMain = files.find((file) => file.fieldname === CqaFileType.cqaMain);
        const soundGoodbye = files.find((file) => file.fieldname === CqaFileType.cqaGoodbye);

        await this.cqac.addCqacConfig({ ...data, client: req.user.client, soundMain, soundGoodbye });
    }

    @Get()
    async getCqaClientConfig(@Req() req: RequestWithUser) {
        return this.cqac.getCqaConfig(req.user.client.id);
    }

    @Delete()
    async deleteCqaConfig(@Req() req: RequestWithUser) {
        return this.cqac.deleteCqacConfig(req.user.client);
    }

    @Put('trunk')
    async updateCqacTrunkData(@Req() req: RequestWithUser, @Body() trunkData: UpdateCqaConfigkDto) {
        return this.cqac.updateTrunkData(req.user.client, trunkData);
    }

    @UseInterceptors(AnyFilesInterceptor())
    @Put('files')
    async updateTrunk(@Req() req: RequestWithUser, @UploadedFiles() files: Array<Express.Multer.File>) {
        const soundMain = files.find((file) => file.fieldname === CqaFileType.cqaMain);
        const soundGoodbye = files.find((file) => file.fieldname === CqaFileType.cqaGoodbye);

        await this.cqac.updateCqacAudioFiles({ client: req.user.client, soundMain, soundGoodbye });
    }
}
