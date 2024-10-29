import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { TTSProviderService } from './tts.provider';
import {
    GetTtsFilesQuery,
    GetTtsFilesResult,
    ListVoicesData,
    TTSConvertVoiceFileData,
    TTSData,
    TtsFilesData,
} from '../interfaces/tts.interface';
import { TTSProviderType } from '../interfaces/tts.enum';
import TTSFileNotFoundException from '../exceptions/tts-file-not-found.exception';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { TTS_FILE_NOT_FOUND } from '../tts.constants';
import { Tts } from '../entities/tts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getUnixTime } from 'date-fns';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { format } from 'date-fns';

@Injectable()
export class TtsService {
    constructor(
        private readonly ttsProvider: TTSProviderService,
        @InjectRepository(Tts)
        private ttsRepository: Repository<Tts>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async textToSpech(data: TTSData): Promise<TTSConvertVoiceFileData> {
        try {
            return await this.ttsProvider.sendTextToTTS(data);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async getVoicesList(ttsType: TTSProviderType): Promise<ListVoicesData[]> {
        try {
            return await this.ttsProvider.getVoicesList(ttsType);
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async convertTextToVoiceFile(data: TTSData): Promise<Tts> {
        try {
            const voiceFile = await this.ttsProvider.sendTextToTTS(data);

            const tts = await this.saveTtsFileData(voiceFile, data);

            return tts;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async getTTSVoiceFile(ttsId: string): Promise<Tts> {
        try {
            const id = Number(ttsId);

            const tts = await this.ttsRepository.findOne({ where: { ttsId: id } });
            if (tts == null) {
                throw new TTSFileNotFoundException(id);
            }

            if (!(await FileUtilsService.exists(`${tts.fullFilePath}${tts.fileName}`))) {
                throw new TTSFileNotFoundException(id, TTS_FILE_NOT_FOUND);
            }

            return tts;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    private async saveTtsFileData(ttsData: TTSConvertVoiceFileData, data: TTSData) {
        const tts = this.ttsRepository.create();
        tts.ttsId = getUnixTime(new Date());
        tts.ttsProviderType = data.ttsType;
        tts.fileName = ttsData.fileName;
        tts.generatedFileName = ttsData.generatedFileName;
        tts.fullFilePath = ttsData.fullFilePath;
        tts.text = data.text;
        tts.name = data.name || ttsData.generatedFileName;

        return await this.ttsRepository.save<Tts>(tts);
    }

    public async getTTSFiles(query: GetTtsFilesQuery): Promise<GetTtsFilesResult> {
        const parsePage = parseInt(query.page || '1');

        const parsePageSize = parseInt(query.pageSize || '10');

        const searchDate = query.dateString || null; //format(new Date(), 'yyyy-MM-dd');

        const queryBuilder = this.ttsRepository.createQueryBuilder('tts').orderBy('tts.id', 'DESC');

        if (searchDate) {
            queryBuilder.where('DATE(tts.createdAt) = :searchDate', { searchDate });
        }

        if (query.name) {
            queryBuilder.andWhere('tts.name LIKE :name', { name: `%${query.name}%` });
        }

        const totalRecords = await queryBuilder.getCount();

        const ttsFiles = await queryBuilder
            .skip((parsePage - 1) * parsePageSize)
            .take(parsePageSize)
            .getMany();

        const formattedTtsFiless: TtsFilesData[] = [];

        ttsFiles.map((file: Tts) =>
            formattedTtsFiless.push({
                name: file.name,
                ttsId: file.ttsId,
                ttsProviderType: file.ttsProviderType,
                text: file.text,
                date: format(new Date(file.createdAt), 'yyyy-MM-dd'),
            }),
        );

        return {
            data: formattedTtsFiless,
            totalRecords: totalRecords || 0,
        };
    }
}
