import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stt } from '../entities/stt.entity';
import {
    CheckRecognizeData,
    CheckRecognizeTaskResult,
    CreateSttData,
    GetRecignizeResultData,
    GetStt,
    RecognizeSpeechData,
} from '../interfaces/stt.interface';
import { SttGetVoiceFileService } from './stt-get-voice-file.service';
import { STTProviderService } from './stt.provider';
import { getUnixTime } from 'date-fns';
import { SttRecognizeStatus } from '../interfaces/stt.enum';

@Injectable()
export class SttService {
    constructor(
        @InjectRepository(Stt)
        private sstRepository: Repository<Stt>,
        private readonly sttGetVoiceFileService: SttGetVoiceFileService,
        private readonly sttProvider: STTProviderService,
    ) {}

    public async recognizeSpeech(data: RecognizeSpeechData): Promise<number> {
        try {
            const voiceFile = await this.sttGetVoiceFileService.getVoiceFile(data.recordingUrl);

            const recognizeResult = await this.sttProvider.recognizeSpeech({ ...voiceFile, sttProviderType: data.sttProviderType });

            return await this.createStt({ ...data, ...voiceFile, ...recognizeResult });
        } catch (e) {
            throw e;
        }
    }

    public async getRecognizeStatus(data: CheckRecognizeData): Promise<CheckRecognizeTaskResult> {
        const stt = await this.sstRepository.findOne({ where: { sttId: data.sttId } });

        if (!stt) throw new Error();
        try {
            const statusData = await this.sttProvider.checkRecognizeTask({ sttProviderType: data.sttProviderType, ...stt });

            await this.updateSttRecognizeStatus(stt.sttId, { ...statusData });

            return statusData;
        } catch (e) {
            await this.updateSttRecognizeStatus(stt.sttId, { sttRecognizeStatus: SttRecognizeStatus.error });
        }
    }

    public async getRecognizeResult(data: GetRecignizeResultData): Promise<void> {
        const stt = await this.sstRepository.findOne({ where: { sttId: data.sttId } });

        if (!stt) throw new Error();

        try {
            const result = await this.sttProvider.getRecognizeResult({ sttProviderType: data.sttProviderType, ...stt });

            await this.updateSttRecognizeStatus(stt.sttId, {
                textDialog: result.transformedDialog,
                originalProvicerRecognize: result.originalResult,
                sttRecognizeStatus: SttRecognizeStatus.completed,
            });
        } catch (e) {
            await this.updateSttRecognizeStatus(stt.sttId, { sttRecognizeStatus: SttRecognizeStatus.error });
        }
    }

    private async updateSttRecognizeStatus(sttId: number, updateData: Partial<Stt>): Promise<void> {
        await this.sstRepository.update({ sttId }, { ...updateData });
    }

    private async createStt(data: CreateSttData): Promise<number> {
        const stt = this.sstRepository.create();

        stt.sttId = getUnixTime(new Date());
        stt.sttProviderType = data.sttProviderType;
        stt.sttRecognizeStatus = data.sttRecognizeStatus;
        stt.fileName = data.fileName;
        stt.generatedFileName = data.generatedFileName;
        stt.fullFilePath = data.fullFilePath;
        stt.externalSttId = data.externalSttId || null;
        stt.downloadVoiceFileId = data.downloadVoiceFileId || null;
        stt.applicationId = data.applicationId;
        await this.sstRepository.save<Stt>(stt);

        return stt.sttId;
    }

    public async deteleStt(applicationId: string): Promise<void> {
        await this.sstRepository.delete({ applicationId });
    }

    public async getStt(applicationId: string): Promise<GetStt | undefined> {
        const stt = await this.sstRepository.findOne({ where: { applicationId } });

        if (!stt) return;

        return {
            sttId: stt.sttId,
            applicationId: stt.applicationId,
            sttRecognizeStatus: stt.sttRecognizeStatus,
            textDialog: stt.textDialog,
        };
    }
}
