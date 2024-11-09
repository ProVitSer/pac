import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Files } from '../entities/files.entity';
import { CreateFilesService } from './create-files.service';
import { FilesService } from './files.service';
import { ApplicationServiceType } from '@app/common/interfaces/enums';
import { AudioConverterService } from '@app/modules/audio-converter/audio-converter.service';

@Injectable()
export class AudioFilesService {
    constructor(
        private readonly configService: ConfigService,
        private readonly createFilesService: CreateFilesService,
        private readonly filesService: FilesService,
    ) {}

    async saveAudioFile(clientId: number, file: Express.Multer.File, appServiceType: ApplicationServiceType): Promise<Files> {
        const audioDir = this.configService.get<string>('files.audioDir');

        const fileStruct = await this.createFilesService.createFile({
            fileName: file.originalname,
            path: audioDir,
            clientId,
            mimetype: file.mimetype,
            size: file.size,
            fileType: 'wav',
        });

        const faliPath = `${this.createFilesService.getFullPath(fileStruct.path, fileStruct.generatedFilePath)}/${fileStruct.generatedFileName}`;

        await AudioConverterService.convertToWav(file, faliPath);

        return await this.filesService.createFile({ ...fileStruct, clientId, applicationServiceType: appServiceType });
    }
}
