import { Body, Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AudioFilesService } from '../services/audio-files.service';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { ApplicationServiceType, Role } from '@app/common/interfaces/enums';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { RequestWithUser } from '@app/common/interfaces/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class FilesController {
    constructor(private readonly audioFilesService: AudioFilesService) {}

    @UseInterceptors(FileInterceptor('file'))
    @Post('audio/upload')
    async uploadFile(
        @Req() req: RequestWithUser,
        @UploadedFile() file: Express.Multer.File,
        @Body() data: { appServiceType: ApplicationServiceType },
    ) {
        return await this.audioFilesService.saveAudioFile(req.user.client.clientId, file, data.appServiceType);
    }
}
