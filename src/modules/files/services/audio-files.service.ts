import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Files } from '../entities/files.entity';
import * as fs from 'fs';
import { SaveAudioFileData } from '../interfaces/files.interface';
import { CreateFilesService } from './create-files.service';
import { ClientService } from '../../../modules/client/services/client.service';
import { FilesService } from './files.service';

@Injectable()
export class AudioFilesService {
    constructor(
        private readonly configService: ConfigService,
        private readonly createFilesService: CreateFilesService,
        private readonly clientService: ClientService,
        private readonly filesService: FilesService,
    ) {}

    async saveAudioFile(stream: NodeJS.ReadableStream, data: SaveAudioFileData): Promise<Files> {
        const audioDir = this.configService.get<string>('files.audioDir');
        const client = await this.clientService.getClientByClientId(data.clientId);
        console.log(client);

        const fileStruct = await this.createFilesService.createFile({
            fileName: data.fileName,
            fileType: data.fileType,
            path: audioDir,
            client,
        });
        console.log(
            `${this.createFilesService.getFullPath(fileStruct.path, fileStruct.generated_file_path)}\\${fileStruct.generated_file_name}`,
        );

        const writeStream = fs.createWriteStream(
            `${this.createFilesService.getFullPath(fileStruct.path, fileStruct.generated_file_path)}\\${fileStruct.generated_file_name}`,
        );

        return new Promise((resolve, reject) => {
            stream.pipe(writeStream);

            stream.on('data', (chunk) => {
                console.log('Received chunk:', chunk);
            });

            writeStream.on('finish', async () => {
                const file = await this.filesService.createFile(fileStruct);

                resolve(file);
            });

            writeStream.on('error', (err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}
