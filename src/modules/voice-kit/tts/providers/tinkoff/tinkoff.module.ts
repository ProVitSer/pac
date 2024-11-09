import { Module } from '@nestjs/common';
import { TinkoffTTS } from './tinkoff';
import { TinkoffGRPCClient } from './grpc/tinkoff.grpc.client';
import { TinkoffTTSService } from './services/tinkoff.service';

@Module({
    imports: [],
    providers: [TinkoffTTS, TinkoffGRPCClient, TinkoffTTSService],
    exports: [TinkoffTTS],
})
export class TinkoffModule {}
