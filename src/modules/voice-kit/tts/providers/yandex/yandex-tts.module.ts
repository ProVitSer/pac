import { Module } from '@nestjs/common';
import { YandexTTSIAMTokenService } from './services/yandex.iam.token.service';
import { YandexTTS } from './yandex';
import { HttpModule } from '@nestjs/axios';
import { YandexTTSService } from './services/yandex.service';
import { YandexTTSApiService } from './api/yandex-api.service';

@Module({
    imports: [HttpModule],
    providers: [YandexTTS, YandexTTSIAMTokenService, YandexTTSService, YandexTTSApiService],
    exports: [YandexTTS],
})
export class YandexTTSModule {}
