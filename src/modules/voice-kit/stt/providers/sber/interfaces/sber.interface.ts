import { RecognizeTaskStatus } from './sber.enum';

export interface SberRecognizeResult {
    result: string[];
    emotions: SebrRecognizeEmotions[];
    status: number;
}

export interface SebrRecognizeEmotions {
    negative: number;
    neutral: number;
    positive: number;
}

export interface SberRecognizeRequest {
    language: string;
    sample_rate: string;
    enable_profanity_filter: boolean;
    channels_count: number;
}

export interface SberSTTUploadResult {
    status: number;
    result: {
        request_file_id: string;
    };
}

export interface SberSetRecognizeTaskOptionsRequest {
    options: {
        language?: string;
        audio_encoding: string;
        sample_rate: number;
        hypotheses_count?: number;
        enable_profanity_filter?: boolean;
        max_speech_timeout?: string;
        channels_count?: number;
        no_speech_timeout?: string;
        hints?: {
            words?: string[];
            enable_letters?: boolean;
            eou_timeout?: string;
        };
        insight_models?: string[];
        speaker_separation_options?: {
            enable?: boolean;
            enable_only_main_speaker?: boolean;
            count?: number;
        };
    };
    request_file_id: string;
}

export interface SberSetRecognizeTaskResult {
    status: number;
    result: {
        id: string;
        created_at: string;
        updated_at: string;
        status: RecognizeTaskStatus;
        error?: string;
    };
}

export interface SberGetRecognizeTaskResult extends SberSetRecognizeTaskResult {
    status: number;
    result: {
        id: string;
        created_at: string;
        updated_at: string;
        status: RecognizeTaskStatus;
        response_file_id: string;
        error?: string;
    };
}

export interface RecognizeResultDataResponse {
    results: RecognizeResultData[];
    eou: boolean;
    emotions_result: {
        positive: number;
        neutral: number;
        negative: number;
    };
    processed_audio_start: string;
    processed_audio_end: string;
    backend_info: {
        model_name: string;
        model_version: string;

        server_version: string;
    };
    channel: number;
    speaker_info: {
        speaker_id: number;
        main_speaker_confidence: number;
    };
    eou_reason: string;
    insight: string;
}

export interface RecognizeResultData {
    text: string;
    normalized_text: string;
    start: string;
    end: string;
    word_alignments: WordAlignments[];
}

export interface WordAlignments {
    word: string;
    start: string;
    end: string;
}

export interface SberTokenResponse {
    access_token: string;
    expires_at: number;
}

export type TokenData = SberTokenResponse;

export interface DownloadVoiceFailData {
    fullFilePathName: string;
}
