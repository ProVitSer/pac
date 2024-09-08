import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Files } from '../entities/files.entity';
import { promises as fs } from 'fs';
import { CreateFilesService } from './create-files.service';
import { FilesService } from './files.service';
import { Client } from '@app/modules/client/entities/client.entity';
import { ApplicationServiceType } from '@app/common/interfaces/enums';

@Injectable()
export class AudioFilesService {
    constructor(
        private readonly configService: ConfigService,
        private readonly createFilesService: CreateFilesService,
        private readonly filesService: FilesService,
    ) {}

    async saveAudioFile(client: Client, file: Express.Multer.File): Promise<Files> {
        const audioDir = this.configService.get<string>('files.audioDir');

        const fileStruct = await this.createFilesService.createFile({
            fileName: file.originalname,
            path: audioDir,
            client,
            mimetype: file.mimetype,
            size: file.size,
        });

        await fs.writeFile(
            `${this.createFilesService.getFullPath(fileStruct.path, fileStruct.generatedFilePath)}/${fileStruct.generatedFileName}`,
            file.buffer,
        );

        return await this.filesService.createFile({ ...fileStruct, client, applicationServiceType: ApplicationServiceType.cqa });
    }
}
