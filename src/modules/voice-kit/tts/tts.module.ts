import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tts } from './entities/tts.entity';
import { TTSConvertService } from './services/tts.convert.service';
import { TTSProviderService } from './services/tts.provider';
import { TtsService } from './services/tts.service';
import { TinkoffModule } from './providers/tinkoff/tinkoff.module';
import { SberTTSModule } from './providers/sber/sber-tts.module';
import { YandexTTSModule } from './providers/yandex/yandex-tts.module';

@Module({
    imports: [TypeOrmModule.forFeature([Tts]), TinkoffModule, SberTTSModule, YandexTTSModule],
    providers: [TTSProviderService, TtsService, TTSConvertService],
    exports: [TtsService],
})
export class TtsModule {}
