import { Module } from '@nestjs/common';
import { TtsModule } from './tts/tts.module';
import { TtsController } from './tts/controllers/tts.controller';
import { SttModule } from './stt/stt.module';

@Module({
    imports: [TtsModule, SttModule],
    exports: [TtsModule, SttModule],
    controllers: [TtsController],
})
export class VoiceKitModule {}
