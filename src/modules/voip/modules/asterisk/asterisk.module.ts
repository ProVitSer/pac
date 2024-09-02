import { Module } from '@nestjs/common';
import { AmiModule } from './apis/ami/ami.module';
import { AriModule } from './apis/ari/ari.module';
import { SorceryModule } from './apis/sorcery/sorcery.module';

@Module({
    imports: [AmiModule, AriModule, SorceryModule],
})
export class AsteriskModule {}
