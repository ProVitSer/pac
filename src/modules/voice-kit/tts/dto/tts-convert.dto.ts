import { IsEnum, IsNotEmpty, IsString, IsOptional, ValidateIf } from 'class-validator';
import { TTSProviderType } from '../interfaces/tts.enum';

export class TtsConvertDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsNotEmpty()
    @IsEnum(TTSProviderType)
    ttsType: TTSProviderType;

    @IsString()
    @IsOptional()
    voice?: string;

    @IsString()
    @ValidateIf((o) => o.voice !== undefined)
    @IsNotEmpty()
    emotion?: string;
}
