import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stt } from './entities/stt.entity';
import { HttpModule } from '@nestjs/axios';
import { SttGetVoiceFileService } from './services/stt-get-voice-file.service';
import { SttService } from './services/stt.service';
import { SttTestController } from './controllers/test.controller';
import { SberSTTModule } from './providers/sber/sber-stt.module';
import { STTProviderService } from './services/stt.provider';

@Module({
    imports: [TypeOrmModule.forFeature([Stt]), HttpModule, SberSTTModule],
    providers: [SttService, SttGetVoiceFileService, STTProviderService],
    exports: [SberSTTModule],
    controllers: [SttTestController],
})
export class SttModule {}
