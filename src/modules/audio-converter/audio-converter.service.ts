import * as ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';

export class AudioConverterService {
    private static readonly supportedFormats = ['audio/wave', 'audio/wav', 'audio/mpeg'];

    // Метод для конвертации аудио в WAV mono, 8000Hz, 64kbps
    public static async convertToWav(file: Express.Multer.File, outputPath: string): Promise<string> {
        if (!this.supportedFormats.includes(file.mimetype)) {
            throw new Error('Unsupported file format. Only MP3 and WAV are supported.');
        }

        const inputStream = this.bufferToStream(file.buffer);

        return new Promise((resolve, reject) => {
            ffmpeg()
                .input(inputStream)
                .audioChannels(1) // Mono
                .audioFrequency(8000) // 8000Hz
                .audioBitrate(64) // 64kbps
                .toFormat('wav')
                .on('end', async () => {
                    resolve(outputPath);
                })
                .on('error', (err) => {
                    reject(new Error(`Error converting file: ${err.message}`));
                })
                .save(outputPath);
        });
    }

    private static bufferToStream(buffer: Buffer): Readable {
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
}
