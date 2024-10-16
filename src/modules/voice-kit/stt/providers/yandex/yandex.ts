import { Injectable } from '@nestjs/common';
import {
    CheckRecognizeTaskData,
    CheckRecognizeTaskResult,
    GetRecognizeResultData,
    RecognizeResultData,
    RecognizeSpeechProviderResult,
    STTProvider,
    VoiceFileData,
} from '../../interfaces/stt.interface';
import { YandexSTTService } from './services/yandex.service';
import { SttRecognizeStatus } from '../../interfaces/stt.enum';

@Injectable()
export class YandexSTT implements STTProvider {
    constructor(private readonly yandexSTTService: YandexSTTService) {}

    public async recognizeSpeech(data: VoiceFileData): Promise<RecognizeSpeechProviderResult> {
        const uploadResult = await this.yandexSTTService.uploadFileToS3(data);

        const result = await this.yandexSTTService.speechAsyncRecognize(uploadResult.uri);

        return {
            externalSttId: String(result.id),
            sttRecognizeStatus: SttRecognizeStatus.inProgress,
        };
    }

    public async checkRecognizeTask(data: CheckRecognizeTaskData): Promise<CheckRecognizeTaskResult> {
        const taskStatus = await this.yandexSTTService.checkRecognizeTask(data);

        return {
            sttId: data.sttId,
            sttRecognizeStatus: taskStatus.done ? SttRecognizeStatus.done : SttRecognizeStatus.inProgress,
        };
    }

    public async getRecognizeResult(data: GetRecognizeResultData): Promise<RecognizeResultData> {
        return await this.yandexSTTService.getRecognizeResult(data);
    }
}
