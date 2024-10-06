export interface UploadFileToS3Result {
    uri: string;
}

export interface RecognizeFileAsyncData {
    uri: string;
    recognition_model: {
        model: string;
        audio_format: {
            container_audio: {
                container_audio_type: string;
            };
        };
    };
}

export interface RecognizeFileAsyncResponse {
    id: string;
    description: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    done: boolean;
    metadata: any;
}

export interface GetRecognizeTaskStatusResponse extends RecognizeFileAsyncResponse {}

export interface RecognizeResultResponse {
    result: {
        sessionUuid: {
            uuid: string;
            userRequestId: string;
        };
        audioCursors: {
            receivedDataMs: string;
            resetTimeMs: string;
            partialTimeMs: string;
            finalTimeMs: string;
            finalIndex: string;
            eouTimeMs: string;
        };
        responseWallTimeMs: string;
        final?: {
            alternatives: Alternatives[];
            channelTag: string;
        };
        finalRefinement?: {
            finalIndex: string;
            normalizedText: {
                alternatives: Alternatives[];
                channelTag: string;
            };
        };
    };
}

export interface Alternatives {
    words: Words[];
    text: string;
    startTimeMs: string;
    endTimeMs: string;
    confidence: number;
    languages: string[];
}

export interface Words {
    text: string;
    startTimeMs: string;
    endTimeMs: string;
}
