import { Module } from '@nestjs/common';
import { SberTTS } from './sber';
import { HttpModule } from '@nestjs/axios';
import { SberTTSService } from './services/sber.service';
import { SberTTSTokenService } from './services/sber.token.service';
import { SberApiService } from './api/sber-api.service';

@Module({
    imports: [HttpModule],
    providers: [SberTTS, SberTTSService, SberTTSTokenService, SberApiService],
    exports: [SberTTS],
})
export class SberTTSModule {}
