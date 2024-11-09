import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stt } from './entities/stt.entity';
import { HttpModule } from '@nestjs/axios';
import { SttGetVoiceFileService } from './services/stt-get-voice-file.service';
import { SttService } from './services/stt.service';
import { SberSTTModule } from './providers/sber/sber-stt.module';
import { STTProviderService } from './services/stt.provider';
import { YandexSTTModule } from './providers/yandex/yandex-stt.module';
import { CheckSTTInWorkSchedule } from './schedule/check-stt-in-work';

@Module({
    imports: [TypeOrmModule.forFeature([Stt]), HttpModule, SberSTTModule, YandexSTTModule],
    providers: [SttService, SttGetVoiceFileService, STTProviderService, CheckSTTInWorkSchedule],
    exports: [SttService],
})
export class SttModule {}
