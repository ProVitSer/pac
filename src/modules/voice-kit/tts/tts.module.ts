import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tts } from './entities/tts.entity';
import { TTSConvertService } from './services/tts.convert.service';
import { TTSProviderService } from './services/tts.provider';
import { TtsService } from './services/tts.service';
import { TinkoffModule } from './providers/tinkoff/tinkoff.module';
import { SberModule } from './providers/sber/sber.module';

@Module({
    imports: [TypeOrmModule.forFeature([Tts]), TinkoffModule],
    providers: [TTSProviderService, TtsService, TTSConvertService],
    exports: [TtsService],
})
export class TtsModule {}
