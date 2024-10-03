import { TTSData } from '@app/modules/voice-kit/tts/interfaces/tts.interface';
import { TinkoffSpeechFormat, TinkoffSpeechSampleRateHertz, TinkoffSpeechVoice } from '../../interfaces/tinkoff.enum';
import { StreamingSynthesizeSpeechRequest } from '../../interfaces/tinkoff.interface';

export class TinkoffStreamingTTSDataAdapter {
    streamingData: StreamingSynthesizeSpeechRequest;
    constructor(data: TTSData) {
        this.streamingData = {
            input: { text: data.text },
            audioConfig: {
                audioEncoding: TinkoffSpeechFormat.linear,
                sampleRateHertz: TinkoffSpeechSampleRateHertz.Eight,
            },
            voice: {
                name: data?.voice ? (`${data.voice}:${data.emotion}` as TinkoffSpeechVoice) : TinkoffSpeechVoice.alyonaNeutral,
            },
        };
    }
}
