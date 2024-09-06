import { Module } from '@nestjs/common';
import { AsteriskModule } from './modules/asterisk/asterisk.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voip } from './entities/voip.entity';
import { VoipService } from './services/voip.service';
import { VoipController } from './controllers/voip-test.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Voip]), AsteriskModule],
    providers: [VoipService],
    exports: [VoipService],
    controllers: [VoipController],
})
export class VoipModule {}
