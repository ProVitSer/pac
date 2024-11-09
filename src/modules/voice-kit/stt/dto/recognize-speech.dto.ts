import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { STTProviderType } from '../interfaces/stt.enum';

export class RecognizeSpeech {
    @IsString()
    @IsNotEmpty()
    recordingUrl: string;

    @IsString()
    @IsNotEmpty()
    applicationId: string;

    @IsEnum(STTProviderType)
    @IsNotEmpty()
    sttProviderType: STTProviderType;
}

export default RecognizeSpeech;
