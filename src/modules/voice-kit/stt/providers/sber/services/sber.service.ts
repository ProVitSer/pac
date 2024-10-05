import { Injectable } from '@nestjs/common';
import { SberSTTApiService } from '../api/sber-api.service';
import { DownloadVoiceFailData } from '../interfaces/sber.interface';

@Injectable()
export class SberSTTService {
    constructor(private readonly sberApiService: SberSTTApiService) {}

    public async uploadVoiceFile(data: DownloadVoiceFailData) {}
}
