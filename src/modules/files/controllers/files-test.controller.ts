import { Controller, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { AudioFilesService } from '../services/audio-files.service';
import { ErrorsInterceptor } from '@app/common/interceptors/errors.interceptor';

@Controller()
export class FilesController {
    constructor(private readonly audioFilesService: AudioFilesService) {}

    @UseInterceptors(ErrorsInterceptor)
    @Post('audio/upload')
    async uploadFile(@Req() req: Request, @Res() res: Response) {
        try {
            console.log(req.headers);
            const fileName = req.headers['filename'] as string;
            const fileType = (req.headers['file-type'] as string) || 'audio';
            const clientId = Number(req.headers['clientid']);

            const filePath = await this.audioFilesService.saveAudioFile(req, { stream: req, fileName, fileType, clientId });
            return res.status(201).json({ filePath });
        } catch (error) {
            return res.status(500).json({ message: 'Error saving file', error });
        }
    }
}
