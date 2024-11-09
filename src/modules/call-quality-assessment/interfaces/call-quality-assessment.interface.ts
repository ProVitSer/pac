import { Client } from '@app/modules/client/entities/client.entity';
import { CallResult, CqaFileType } from './call-quality-assessment.enum';
import { Files } from '@app/modules/files/entities/files.entity';
import { CallQualityAssessmentConfig } from '../entities/call-quality-assessment.-config.entity';
import { ChannelHangupRequest } from 'ari-client';

export interface CreateCqacConfigData {
    client: Client;
    // authId: string;
    // authPassword: string;
    // pbxIp: string;
    soundMain: Express.Multer.File;
    soundGoodbye?: Express.Multer.File;
}

export interface CqacAudioFiles {
    fileId: number;
    cqaFileType: CqaFileType;
}

export interface CqacDataAdapter {
    trunkId: string;
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

export interface CallQualitySound {
    sound?: string;
    cqaFileType?: CqaFileType;
}

export interface AddInitStaticInfo {
    trunkId: string;
    uniqueid: string;
    clientNumber: string;
}

export interface UpdateStatisticInfoData {
    uniqueid: string;
    rating?: number;
    callResult?: CallResult;
    clientNumber?: string;
    clientName?: string;
    externalCallId?: string;
    managerData?: string;
    managerNumber?: string;
    country?: string;
    region?: string;
    city?: string;
    clientCompany?: string;
}

export interface EndCallSubHandlerData {
    cqac: CallQualityAssessmentConfig;
    event: ChannelHangupRequest;
}

export interface ExternalCdrData {
    clientNumber?: string;
    externalCallId?: string;
    managerNumber?: string;
    managerData?: string;
}

export interface GetCqaStatisticQuery {
    page: string;
    pageSize: string;
    dateString?: string;
    managerNumber?: string;
}

export interface GetCqaStatisticResult {
    data: CqaStatisticData[];
    totalRecords: number;
}

export interface CqaStatisticData {
    rating?: string;
    callResult?: CallResult;
    clientNumber?: string;
    managerData?: string;
    managerNumber?: string;
    country?: string;
    region?: string;
    city?: string;
    date: string;
}
