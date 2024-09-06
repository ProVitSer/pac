import { Body, Controller, Post } from '@nestjs/common';
import { VoipService } from '../services/voip.service';

@Controller()
export class VoipController {
    constructor(private readonly voipService: VoipService) {}

    @Post()
    async createProduct(@Body() voip: any): Promise<void> {
        return this.voipService.addNewTrunk(voip);
    }
}
