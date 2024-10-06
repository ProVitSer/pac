import { STTProviderType, SttRecognizeStatus } from './stt.enum';

export interface RecognizeSpeechData {
    recordingUrl: string;
    sttProviderType: STTProviderType;
}

export interface RecognizeSpeechResult {
    sttId: number;
    sttProviderType: STTProviderType;
    sttRecognizeStatus: SttRecognizeStatus;
}

export interface GetVoiceFileDataResult {
    fileName: string;
    generatedFileName: string;
    fullFilePath: string;
}

export interface VoiceFileData extends GetVoiceFileDataResult {
    sttProviderType: STTProviderType;
}

export interface SttData {
    externalSttId: string;
    sttProviderType: STTProviderType;
}

export interface STTProvider {
    recognizeSpeech(data: VoiceFileData): Promise<RecognizeSpeechProviderResult>;
    checkRecognizeTask(data: CheckRecognizeTaskData): Promise<CheckRecognizeTaskResult>;
    getRecognizeResult(data: GetRecognizeResultData): Promise<RecognizeResultData>;
}

export interface STTProviderInterface {
    recognizeSpeech(data: VoiceFileData): Promise<RecognizeSpeechProviderResult>;
    checkRecognizeTask(data: CheckRecognizeTaskData): Promise<CheckRecognizeTaskResult>;
    getRecognizeResult(data: GetRecognizeResultData): Promise<RecognizeResultData>;
    get provider(): STTProviders;
}

export type STTProviders = {
    [key in STTProviderType]: STTProvider;
};

export interface RecognizeSpeechProviderResult {
    sttRecognizeStatus: SttRecognizeStatus;
    externalSttId?: string;
    downloadVoiceFileId?: string;
    processedVoiceFileId?: string;
}

export interface CreateSttData {
    sttProviderType: STTProviderType;
    fileName: string;
    generatedFileName: string;
    fullFilePath: string;
    externalSttId?: string;
    downloadVoiceFileId?: string;
    processedVoiceFileId?: string;
    sttRecognizeStatus: SttRecognizeStatus;
}

export interface CheckRecognizeTaskResult {
    sttId: number;
    externalSttId?: string;
    downloadVoiceFileId?: string;
    processedVoiceFileId?: string;
    sttRecognizeStatus: SttRecognizeStatus;
}

export interface CheckRecognizeTaskData {
    sttId: number;
    externalSttId?: string;
    downloadVoiceFileId?: string;
    processedVoiceFileId?: string;
    sttProviderType: STTProviderType;
}

export interface CheckRecognizeData {
    sttId: number;
    sttProviderType: STTProviderType;
}

export interface GetRecignizeResultData {
    sttId: number;
    sttProviderType: STTProviderType;
}

export interface GetRecognizeResultData extends CheckRecognizeTaskData {}

export interface RecognizeResultData {
    transformedDialog: string[];
    originalResult: any;
}
