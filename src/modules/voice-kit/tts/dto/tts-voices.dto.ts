import { IsEnum, IsNotEmpty } from 'class-validator';
import { TTSProviderType } from '../interfaces/tts.enum';

export class TtsVoicesDTO {
    @IsNotEmpty()
    @IsEnum(TTSProviderType)
    ttsType: TTSProviderType;
}
