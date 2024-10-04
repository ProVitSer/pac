import { Injectable } from '@nestjs/common';
import {
    ListVoicesData,
    TTSConvertVoiceFileData,
    TTSData,
    TTSProvider,
    TTSProviderInterface,
    TTSProviders,
    TTSProviderVoiceFileData,
} from '../interfaces/tts.interface';
import { TTSProviderType } from '../interfaces/tts.enum';
import { TTSConvertService } from './tts.convert.service';
import { PROVIDER_ERROR } from '../tts.constants';
import { TinkoffTTS } from '../providers/tinkoff/tinkoff';
import { SberTTS } from '../providers/sber/sber';

@Injectable()
export class TTSProviderService implements TTSProviderInterface {
    constructor(
        private readonly ttsConvertService: TTSConvertService,
        private readonly tinkoff: TinkoffTTS,
        private readonly sber: SberTTS,
    ) {}

    get provider(): TTSProviders {
        return {
            [TTSProviderType.sber]: this.sber,
            [TTSProviderType.tinkoff]: this.tinkoff,
        };
    }

    public async sendTextToTTS(data: TTSData): Promise<TTSConvertVoiceFileData> {
        const provider = this.getProvider(data.ttsType);

        await provider.checkVoiceEmotion(data);

        const resultTTS = await provider.convertTextToRawVoiceFile(data);

        const res = await this.convertTTSVoiceFileToWav(data.ttsType, resultTTS);

        return res;
    }

    public async getVoicesList(ttsType: TTSProviderType): Promise<ListVoicesData[]> {
        const provider = this.getProvider(ttsType);

        return await provider.voiceList();
    }

    public getProvider(ttsType: TTSProviderType): TTSProvider {
        if (!(ttsType in this.provider)) throw PROVIDER_ERROR;
        return this.provider[ttsType];
    }

    public async convertTTSVoiceFileToWav(ttsType: TTSProviderType, data: TTSProviderVoiceFileData): Promise<TTSConvertVoiceFileData> {
        return await this.ttsConvertService.convertTTSVoiceFileToWav(ttsType, data);
    }
}
