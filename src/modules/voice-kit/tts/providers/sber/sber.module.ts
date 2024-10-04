import { Module } from '@nestjs/common';
import { SberTTS } from './sber';
import { HttpModule } from '@nestjs/axios';
import { SberService } from './services/sber.service';
import { SberTokenService } from './services/sber.token.service';
import { SberApiService } from './api/sber-api.service';

@Module({
    imports: [HttpModule],
    providers: [SberTTS, SberService, SberTokenService, SberApiService],
    exports: [SberTTS],
})
export class SberModule {}
