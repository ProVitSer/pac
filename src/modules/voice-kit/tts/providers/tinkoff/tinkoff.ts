import { BadRequestException, Injectable } from '@nestjs/common';
import { TTSProvider, TTSData, TTSProviderVoiceFileData, ListVoicesData } from '../../interfaces/tts.interface';
import { VOICE_ERROR, EMOTION_ERROR } from '../../tts.constants';
import { TinkoffTTSService } from './services/tinkoff.service';
import { TinkoffStreamingTTSDataAdapter } from './adapters/tinkoff.streaming.adapter';

@Injectable()
export class TinkoffTTS implements TTSProvider {
    constructor(private readonly tinkoffTTSService: TinkoffTTSService) {}

    public async convertTextToRawVoiceFile(data: TTSData): Promise<TTSProviderVoiceFileData> {
        try {
            return await this.tinkoffTTSService.streamingSynthesize(new TinkoffStreamingTTSDataAdapter(data));
        } catch (e) {
            throw e;
        }
    }

    public async checkVoiceEmotion(data: TTSData): Promise<void> {
        const { voice, emotion } = data;
        if (voice) {
            const listVoices = await this.tinkoffTTSService.getListVoices();
            if (!listVoices.some((item) => item.name === voice)) throw new BadRequestException(`${VOICE_ERROR} ${voice}`);
            if (!listVoices.some((item) => item.emotions.includes(emotion)))
                throw new BadRequestException(`${EMOTION_ERROR} ${emotion} для голоса ${voice}`);
        }
    }

    public async voiceList(): Promise<ListVoicesData[]> {
        try {
            return await this.tinkoffTTSService.getListVoices();
        } catch (e) {
            throw e;
        }
    }
}
