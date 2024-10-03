import { Injectable } from '@nestjs/common';
import { TTSProviderService } from './tts.provider';
import { ListVoicesData, TTSConvertVoiceFileData, TTSData } from '../interfaces/tts.interface';
import { TTSProviderType } from '../interfaces/tts.enum';
import TTSFileNotFoundException from '../exceptions/tts-file-not-found.exception';
import { FileUtilsService } from '@app/common/utils/file.utils';
import { TTS_FILE_NOT_FOUND } from '../tts.constants';
import { Tts } from '../entities/tts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getUnixTime } from 'date-fns';

@Injectable()
export class TtsService {
    constructor(
        private readonly ttsProvider: TTSProviderService,
        @InjectRepository(Tts)
        private ttsRepository: Repository<Tts>,
    ) {}

    public async textToSpech(data: TTSData): Promise<TTSConvertVoiceFileData> {
        try {
            return await this.ttsProvider.sendTextToTTS(data);
        } catch (e) {
            throw e;
        }
    }

    public async getVoicesList(ttsType: TTSProviderType): Promise<ListVoicesData[]> {
        try {
            return await this.ttsProvider.getVoicesList(ttsType);
        } catch (e) {
            throw e;
        }
    }

    public async convertTextToVoiceFile(data: TTSData): Promise<Tts> {
        try {
            const voiceFile = await this.ttsProvider.sendTextToTTS(data);

            const tts = await this.saveTtsFileData(voiceFile, data);

            return tts;
        } catch (e) {
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

        return await this.ttsRepository.save<Tts>(tts);
    }
}
