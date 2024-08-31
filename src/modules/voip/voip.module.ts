import { Module } from '@nestjs/common';
import { AsteriskModule } from './asterisk/asterisk.module';

@Module({
    imports: [AsteriskModule],
})
export class VoipModule {}
