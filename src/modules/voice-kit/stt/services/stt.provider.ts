import { Injectable } from '@nestjs/common';
import { STTProviderType } from '../interfaces/stt.enum';
import {
    STTProviderInterface,
    STTProviders,
    STTProvider,
    VoiceFileData,
    RecognizeSpeechProviderResult,
    CheckRecognizeTaskResult,
    CheckRecognizeTaskData,
    GetRecognizeResultData,
    RecognizeResultData,
} from '../interfaces/stt.interface';
import { STT_PROVIDER_ERROR } from '../stt.constants';
import { SberSTT } from '../providers/sber/sber';
import { YandexSTT } from '../providers/yandex/yandex';

@Injectable()
export class STTProviderService implements STTProviderInterface {
    constructor(
        private readonly sberSTT: SberSTT,
        private readonly yandexSTT: YandexSTT,
    ) {}

    get provider(): STTProviders {
        return {
            [STTProviderType.sber]: this.sberSTT,
            [STTProviderType.yandex]: this.yandexSTT,
        };
    }

    public async recognizeSpeech(data: VoiceFileData): Promise<RecognizeSpeechProviderResult> {
        const provider = this.getProvider(data.sttProviderType);

        return await provider.recognizeSpeech(data);
    }
    public async checkRecognizeTask(data: CheckRecognizeTaskData): Promise<CheckRecognizeTaskResult> {
        const provider = this.getProvider(data.sttProviderType);

        return await provider.checkRecognizeTask(data);
    }
    public async getRecognizeResult(data: GetRecognizeResultData): Promise<RecognizeResultData> {
        const provider = this.getProvider(data.sttProviderType);

        return await provider.getRecognizeResult(data);
    }

    public getProvider(ttsType: STTProviderType): STTProvider {
        if (!(ttsType in this.provider)) throw STT_PROVIDER_ERROR;
        return this.provider[ttsType];
    }
}
