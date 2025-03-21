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
import { SberSTTApiService } from './api/sber-api.service';
import { DEFAULT_SBER_STT_RECOGNIZE_OPTIONS, SBER_TTS_STATUS_TO_RECOGNIZE_STATUS } from './sber-stt.constants';
import { RecognizeTaskStatus } from './interfaces/sber.enum';
import { SttRecognizeStatus } from '../../interfaces/stt.enum';
import { RecognizeResultDataResponse } from './interfaces/sber.interface';

@Injectable()
export class SberSTT implements STTProvider {
    constructor(private readonly sberSTTApiService: SberSTTApiService) {}

    public async recognizeSpeech(data: VoiceFileData): Promise<RecognizeSpeechProviderResult> {
        const updaloadResult = await this.sberSTTApiService.upload({ fullFilePathName: `${data.fullFilePath}${data.fileName}` });

        const setRecognizeTask = await this.sberSTTApiService.speechAsyncRecognize({
            options: { ...DEFAULT_SBER_STT_RECOGNIZE_OPTIONS },
            request_file_id: updaloadResult.result.request_file_id,
        });

        return {
            externalSttId: String(setRecognizeTask.result.id),
            downloadVoiceFileId: updaloadResult.result.request_file_id,
            sttRecognizeStatus:
                setRecognizeTask.result.status == RecognizeTaskStatus.ERROR ? SttRecognizeStatus.error : SttRecognizeStatus.inProgress,
        };
    }
    public async checkRecognizeTask(data: CheckRecognizeTaskData): Promise<CheckRecognizeTaskResult> {
        const taskStatus = await this.sberSTTApiService.taskGet(data.externalSttId);

        return {
            sttId: data.sttId,
            processedVoiceFileId: taskStatus.result.response_file_id,
            sttRecognizeStatus: SBER_TTS_STATUS_TO_RECOGNIZE_STATUS[taskStatus.result.status],
        };
    }
    public async getRecognizeResult(data: GetRecognizeResultData): Promise<RecognizeResultData> {
        const originalResult = await this.sberSTTApiService.download(data.processedVoiceFileId);

        return {
            originalResult,
            transformedDialog: this.extractUniqueTexts(originalResult),
        };
    }

    private extractUniqueTexts(originalResult: RecognizeResultDataResponse[]) {
        const texts = [];
        let previousText = '';

        originalResult.forEach((item) => {
            if (item.results && item.results.length > 0) {
                const currentText = item.results[0].normalized_text.trim();

                if (currentText !== previousText) {
                    texts.push(currentText);
                    previousText = currentText;
                }
            }
        });

        return texts;
    }
}
