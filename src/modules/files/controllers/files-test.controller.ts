/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Param, ParseIntPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from '../services/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ConfigEnvironment } from '@app/common/config/interfaces/config.interface';
import configuration from '@app/common/config/config.provider';

@Controller()
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload/:voipId/:fileType')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, callback) => {
                    const config = configuration() as any;

                    callback(null, config.files.tmpDir);
                },
                filename: (req, file, callback) => {
                    const ext = path.extname(file.originalname);
                    const filename = `${Date.now()}${ext}`;
                    callback(null, filename);
                },
            }),
        }),
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Param('voipId', ParseIntPipe) voipId: number,
        @Param('fileType') fileType: string,
    ) {}
}
