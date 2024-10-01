export interface SaveAudioFileData {
    stream: NodeJS.ReadableStream;
    fileName: string;
    fileType: string;
    clientId: number;
}

export interface SaveFileData {
    fileName: string;
    mimetype: string;
    path: string;
    clientId: number;
    size: number;
    fileType: string;
}
