import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Files } from '../entities/files.entity';
import { Repository } from 'typeorm';
import { FileType } from '../interfaces/files.enum';

@Injectable()
export class FilesService {
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Files)
        private readonly fileRepository: Repository<Files>,
    ) {}

    async saveAudioFile(file: Express.Multer.File, voipId: number): Promise<Files> {
        const audioDir = this.configService.get<string>('files.audioDir');

        const filePath = path.join(audioDir, file.filename);

        fs.renameSync(file.path, filePath);

        const newFile = this.fileRepository.create({
            filename: file.filename,
            path: filePath,
            mimetype: file.mimetype,
            size: file.size,
            file_type: FileType.audio,
            voip: { id: voipId },
        });

        return this.fileRepository.save(newFile);
    }

    async getFile(fileId: number): Promise<Files> {
        return this.fileRepository.findOne({ where: { id: fileId } });
    }

    async deleteFile(fileId: number): Promise<void> {
        const file = await this.getFile(fileId);
        if (file) {
            fs.unlinkSync(file.path);
            await this.fileRepository.remove(file);
        }
    }
}
