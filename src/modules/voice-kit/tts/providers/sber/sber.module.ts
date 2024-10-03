import { Module } from '@nestjs/common';
import { SberTTS } from './sber';
import { HttpModule } from '@nestjs/axios';
import { SberService } from './services/sber.service';
import { SberTokenService } from './services/sber.token.service';
import { SberGRPCClient } from './grpc/sber.grpc.client';

@Module({
    imports: [HttpModule],
    providers: [SberTTS, SberService, SberTokenService, SberGRPCClient],
    exports: [SberTTS],
})
export class SberModule {}
