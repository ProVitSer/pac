import { Controller, Get, UseGuards } from '@nestjs/common';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';

import { Role } from '@app/common/interfaces/enums';
import RoleGuard from '@app/modules/auth/guards/role.guard';
import { SttService } from '../services/stt.service';
import { STTProviderType } from '../interfaces/stt.enum';

@UseGuards(RoleGuard([Role.Admin, Role.Manager]))
@UseGuards(JwtAuthenticationGuard)
@Controller('stt')
export class SttTestController {
    constructor(private readonly sttService: SttService) {}

    @Get()
    public async test() {
        // await this.sttService.recognizeSpeech({
        //     recordingUrl: '',
        //     sttProviderType: STTProviderType.sber,
        // });
        // await this.sttService.getRecognizeStatus({
        //     sttId: 1728155298,
        //     sttProviderType: STTProviderType.sber,
        // });
        // await this.sttService.getRecognizeResult({
        //     sttId: 1728155298,
        //     sttProviderType: STTProviderType.sber,
        // });
    }
}
