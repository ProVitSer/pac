import { Client } from '../../../modules/client/entities/client.entity';

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
    client: Client;
    size: number;
    fileType: string;
}
