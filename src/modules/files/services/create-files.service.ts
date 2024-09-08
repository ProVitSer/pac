import { Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { promises } from 'fs';
import * as path from 'path';
import { Files } from '../entities/files.entity';
import { SaveFileData } from '../interfaces/files.interface';
import * as mime from 'mime-types';

@Injectable()
export class CreateFilesService {
    constructor() {}

    public async createFile(data: SaveFileData): Promise<Partial<Files>> {
        const createFileStruct = this.createFileStruct(data);

        await this.makeDirIfNotExist(this.getFullPath(createFileStruct.path, createFileStruct.generatedFilePath));

        return createFileStruct;
    }

    private createFileStruct(data: SaveFileData): Partial<Files> {
        const generateFilename = this.generateFilename();

        return {
            fileName: data.fileName || generateFilename,
            generatedFilePath: this.getFilePath(generateFilename),
            path: data.path,
            generatedFileName: `${generateFilename}.wav`,
            mimetype: data.mimetype,
            size: data.size,
        };
    }

    private generateFilename(): string {
        return uuid.v4();
    }

    private async makeDirIfNotExist(path: string): Promise<void> {
        await promises.mkdir(path, {
            recursive: true,
        });
    }

    public getFullPath(basePath: string, generatedFilePath: string): string {
        return path.join(basePath, generatedFilePath);
    }

    private getContentType(filename: string): string | null {
        const mimeType = mime.lookup(filename);

        return !!mimeType ? mimeType : null;
    }

    private getFilePath(fileName: string): string {
        return path.join.apply(null, fileName.substring(0, 5).split(''));
    }
}
