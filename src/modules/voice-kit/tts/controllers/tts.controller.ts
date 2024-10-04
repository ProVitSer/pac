import { Body, Controller, Get, Param, Post, Res, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { Response } from 'express';
import { TtsService } from '../services/tts.service';
import { TtsConvertDto } from '../dto/tts-convert.dto';
import { ListVoicesData } from '../interfaces/tts.interface';
import { TtsVoicesDTO } from '../dto/tts-voices.dto';
import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('tts')
export class TtsController {
    constructor(private readonly ttsService: TtsService) {}

    @Post('convert/online')
    async convert(@Body() data: TtsConvertDto, @Res() res: Response): Promise<any> {
        const ttsFile = await this.ttsService.textToSpech(data);

        const file = await FileUtilsService.readStreamVoiceFile(`${ttsFile.fullFilePath}${ttsFile.fileName}`);

        file.pipe(res);
    }

    @Post('convert/file')
    async file(@Body() data: TtsConvertDto) {
        return this.ttsService.convertTextToVoiceFile(data);
    }

    @Get('ttsFile/:ttsId')
    async getTTSFile(@Param('ttsId') ttsId: string, @Res() res: Response) {
        const ttsFile = await this.ttsService.getTTSVoiceFile(ttsId);

        const file = await FileUtilsService.readStreamVoiceFile(`${ttsFile.fullFilePath}${ttsFile.fileName}`);

        file.pipe(res);
    }

    @Post('voices')
    async getVoices(@Body() { ttsType }: TtsVoicesDTO): Promise<ListVoicesData[]> {
        return await this.ttsService.getVoicesList(ttsType);
    }
}
