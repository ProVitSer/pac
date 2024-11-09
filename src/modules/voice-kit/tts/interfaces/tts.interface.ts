import { TTSProviderType, VoiceFileFormat } from './tts.enum';

export interface TTSData {
    name?: string;
    ttsType: TTSProviderType;
    text: string;
    voice?: string;
    emotion?: string;
}

export interface TTSBaseVoiceFileData {
    fileName: string;
    generatedFileName: string;
    fullFilePath: string;
}

export interface TTSConvertVoiceFileData extends TTSBaseVoiceFileData {
    format: VoiceFileFormat;
}

export interface TTSProviderVoiceFileData extends TTSBaseVoiceFileData {
    format: VoiceFileFormat.raw;
    sampleRateHertz: number;
}

export interface TTSProviderInterface {
    sendTextToTTS(data: TTSData): Promise<TTSConvertVoiceFileData>;
    getProvider(ttsType: TTSProviderType): TTSProvider;
    convertTTSVoiceFileToWav(ttsType: TTSProviderType, data: TTSProviderVoiceFileData): Promise<TTSConvertVoiceFileData>;
    get provider(): TTSProviders;
}

export interface TTSProvider {
    convertTextToRawVoiceFile(data: TTSData): Promise<TTSProviderVoiceFileData>;
    checkVoiceEmotion(data: TTSData): Promise<void>;
    voiceList(): Promise<ListVoicesData[]>;
}

export type TTSProviders = {
    [key in TTSProviderType]: TTSProvider;
};

export class ListVoicesData {
    name: string;
    emotions: string[];
}

export interface GetTtsFilesQuery {
    page: string;
    pageSize: string;
    dateString?: string;
    name?: string;
}

export interface GetTtsFilesResult {
    data: TtsFilesData[];
    totalRecords: number;
}

export interface TtsFilesData {
    name: string;
    ttsId: number;
    ttsProviderType: TTSProviderType;
    text: string;
    date: string;
}
