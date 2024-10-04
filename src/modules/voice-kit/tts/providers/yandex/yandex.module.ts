import { Module } from '@nestjs/common';
import { YandexIAMTokenService } from './services/yandex.iam.token.service';
import { YandexTTS } from './yandex';
import { HttpModule } from '@nestjs/axios';
import { YandexService } from './services/yandex.service';
import { YandexTtsApiervice } from './api/yandex-api.service';

@Module({
    imports: [HttpModule],
    providers: [YandexTTS, YandexIAMTokenService, YandexService, YandexTtsApiervice],
    exports: [YandexTTS],
})
export class YandexModule {}
