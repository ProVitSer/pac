import { ConfigService } from '@nestjs/config';
import { S3ModuleOptions } from 'nestjs-s3';
import { VoiceKitSttS3YandexEnvironmentVariables } from './interfaces/config.interface';

export function s3YandexSTTConfig(config: ConfigService): S3ModuleOptions {
    const s3 = config.get('voiceKit.stt.yandex.s3') as VoiceKitSttS3YandexEnvironmentVariables;
    return {
        config: {
            credentials: {
                accessKeyId: s3.accessKeyId,
                secretAccessKey: s3.secretAccessKey,
            },
            region: s3.region,
            endpoint: s3.endpoint,
            forcePathStyle: true,
        },
    };
}
