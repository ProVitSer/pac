import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import * as fs from 'fs';
import { Files } from '../entities/files.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(Files)
        private readonly fileRepository: Repository<Files>,
    ) {}

    public async createFile(data: Partial<Files>): Promise<Files> {
        const newFile = this.fileRepository.create(data);

        return this.fileRepository.save(newFile);
    }

    public async getFile(fileId: number): Promise<Files> {
        return this.fileRepository.findOne({ where: { id: fileId } });
    }

    public async deleteFile(fileId: number): Promise<void> {
        const file = await this.getFile(fileId);
        if (file) {
            //fs.unlinkSync(file.path);
            await this.fileRepository.remove(file);
        }
    }

    public async getFilesByClientId(clientId: number): Promise<Files[]> {
        return this.fileRepository.find({
            where: { client: { id: clientId } },
            relations: ['client'],
        });
    }

    public async getFiles(filesId: number[]): Promise<Files[]> {
        return this.fileRepository.find({
            where: { id: In([...filesId]) },
        });
    }
}
