import { Module } from '@nestjs/common';
import { SberSTT } from './sber';
import { HttpModule } from '@nestjs/axios';
import { SberSTTService } from './services/sber.service';
import { SberSTTTokenService } from './services/sber.token.service';
import { SberSTTApiService } from './api/sber-api.service';

@Module({
    imports: [HttpModule],
    providers: [SberSTT, SberSTTService, SberSTTTokenService, SberSTTApiService],
    exports: [SberSTT],
})
export class SberSTTModule {}