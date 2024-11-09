import { FileUtilsService } from '@app/common/utils/file.utils';
import { PutObjectCommandInput } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { CheckRecognizeTaskData, GetRecognizeResultData, RecognizeResultData, VoiceFileData } from '../../../interfaces/stt.interface';
import { ConfigService } from '@nestjs/config';
import {
    GetRecognizeTaskStatusResponse,
    RecognizeFileAsyncResponse,
    RecognizeResultResponse,
    UploadFileToS3Result,
} from '../interfaces/yandex.interface';
import { YandexSTTApiService } from '../api/yandex-api.service';

@Injectable()
export class YandexSTTService {
    constructor(
        private readonly configService: ConfigService,
        @InjectS3() private readonly s3: S3,
        private readonly yandexSTTApiService: YandexSTTApiService,
    ) {}

    public async uploadFileToS3(data: VoiceFileData): Promise<UploadFileToS3Result> {
        const now = new Date();

        const year = now.getFullYear();

        const month = String(now.getMonth() + 1).padStart(2, '0');

        const day = String(now.getDate()).padStart(2, '0');

        const fileStream = await FileUtilsService.readStreamVoiceFile(`${data.fullFilePath}${data.fileName}`);

        const params: PutObjectCommandInput = {
            Bucket: this.configService.get('voiceKit.stt.yandex.s3.backetPath'),
            Key: `${year}/${month}/${day}/${data.fileName}`,
            Body: fileStream,
        };

        await this.s3.putObject(params);

        return {
            uri: `${this.configService.get('voiceKit.stt.yandex.s3.endpoint')}/${this.configService.get('voiceKit.stt.yandex.s3.backetPath')}/${year}/${month}/${day}/${data.fileName}`,
        };
    }

    public async speechAsyncRecognize(uri: string): Promise<RecognizeFileAsyncResponse> {
        const requestData = {
            uri,
            recognition_model: {
                model: 'general',
                audio_format: {
                    container_audio: {
                        container_audio_type: 'WAV',
                    },
                },
            },
        };
        return await this.yandexSTTApiService.recognizeFileAsync(requestData);
    }

    public async checkRecognizeTask(data: CheckRecognizeTaskData): Promise<GetRecognizeTaskStatusResponse> {
        return await this.yandexSTTApiService.getRecognizeTaskStatus(data.externalSttId);
    }

    public async getRecognizeResult(data: GetRecognizeResultData): Promise<RecognizeResultData> {
        const originalResult = await this.yandexSTTApiService.getRecognizeResult(data.externalSttId);

        return {
            originalResult,
            transformedDialog: this.extractUniqueTexts(originalResult),
        };
    }

    private extractUniqueTexts(originalResult: RecognizeResultResponse[]) {
        const texts = [];
        let previousText = '';

        originalResult.forEach((item) => {
            const finalData = item?.result?.final || item?.result?.finalRefinement?.normalizedText;

            if (finalData && finalData.alternatives?.length > 0) {
                const currentText = finalData.alternatives[0].text.trim();

                if (currentText !== previousText) {
                    texts.push(currentText);
                    previousText = currentText;
                }
            }
        });

        return texts;
    }
}
