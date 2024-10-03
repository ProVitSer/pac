import { Module } from '@nestjs/common';
import { TtsModule } from './tts/tts.module';
import { TtsController } from './tts/controllers/tts.controller';

@Module({
    imports: [TtsModule],
    exports: [TtsModule],
    controllers: [TtsController],
})
export class VoiceKitModule {}
