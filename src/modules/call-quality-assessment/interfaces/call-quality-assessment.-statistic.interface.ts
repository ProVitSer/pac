import { Client } from '@app/modules/client/entities/client.entity';
import { CqaFileType } from './call-quality-assessment.-statistic.enum';
import { CreateTrunkResult } from '@app/modules/voip/interfaces/voip.interface';
import { Files } from '@app/modules/files/entities/files.entity';

export interface CreateCqacConfigData {
    client: Client;
    authId: string;
    authPassword: string;
    pbxIp: string;
    soundMain: Express.Multer.File;
    soundGoodbye?: Express.Multer.File;
}

export interface CqacAudioFiles {
    fileId: number;
    cqaFileType: CqaFileType;
}

export interface CqacDataAdapter {
    trunk: CreateTrunkResult;
    mainFile: Files;
    goodByeFile: Files;
    client: Client;
}

export interface UpdateCqacAudioFiles {
    client: Client;
    soundMain?: Express.Multer.File;
    soundGoodbye?: Express.Multer.File;
}

export interface AudioFilesData {
    fileId: number;
    cqaFileType: CqaFileType;
}
