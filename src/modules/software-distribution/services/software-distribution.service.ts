import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { SoftwareDownloadType } from '../interfaces/software-distribution.enum';
import PackageNotFoundException from '../exceptions/package-not-found.exeption';
import { Response } from 'express';
import { SoftwareFileData } from '../interfaces/software-distribution.interface';
import { SOFTWARE_DOWNLOAD_PATH_NAME } from '../../../common/constants/software-distribution';

@Injectable()
export class SoftwareDistributionService {
    constructor() {}

    public downloadInstallPack(res: Response): fs.ReadStream {
        return this.getFileStream(SoftwareDownloadType.installer, res);
    }

    public downloadDistrib(os: string, res: Response): fs.ReadStream {
        return this.getFileStream(os as SoftwareDownloadType, res);
    }

    private getFileStream(downloadType: SoftwareDownloadType, res: Response): fs.ReadStream {
        const fileData = this.getFileData(downloadType);

        res.setHeader('Content-Disposition', `attachment; filename="${fileData.fileName}"`);

        return fs.createReadStream(fileData.filePath);
    }

    private getFileData(downloadType: SoftwareDownloadType): SoftwareFileData {
        const baseDir = path.resolve(__dirname, '..', '..', '..', '..', '..', 'assets');

        const sdf = SOFTWARE_DOWNLOAD_PATH_NAME[downloadType];

        switch (downloadType) {
            case SoftwareDownloadType.windows:
                return {
                    filePath: path.join(baseDir, sdf.filePath, 'pac.exe'),
                    fileName: sdf.fileName,
                };
            case SoftwareDownloadType.linux:
                return {
                    filePath: path.join(baseDir, sdf.filePath, 'pac.exe'),
                    fileName: sdf.fileName,
                };
            case SoftwareDownloadType.installer:
                return {
                    filePath: path.join(baseDir, sdf.filePath, 'pac.exe'),
                    fileName: sdf.fileName,
                };

            default:
                throw new PackageNotFoundException();
        }
    }
}
