import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { S3Module } from 'nestjs-s3';
import { YandexSTT } from './yandex';
import { s3YandexSTTConfig } from '@app/common/config/yandex-tts-s3.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { YandexSTTService } from './services/yandex.service';
import { YandexSTTApiService } from './api/yandex-api.service';

@Module({
    imports: [
        S3Module.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return s3YandexSTTConfig(configService);
            },
            inject: [ConfigService],
        }),
        HttpModule,
    ],
    providers: [YandexSTT, YandexSTTService, YandexSTTApiService],
    exports: [YandexSTT],
})
export class YandexSTTModule {}
