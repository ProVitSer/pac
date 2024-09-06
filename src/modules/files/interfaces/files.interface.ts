import { Client } from '../../../modules/client/entities/client.entity';

export interface SaveAudioFileData {
    stream: NodeJS.ReadableStream;
    fileName: string;
    fileType: string;
    clientId: number;
}

export interface SaveFileData {
    fileName: string;
    fileType: string;
    path: string;
    client: Client;
}
