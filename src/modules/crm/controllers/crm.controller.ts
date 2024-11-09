import { Body, Controller, Post } from '@nestjs/common';
import { OnExternalCallStart } from '../interfaces/crm.interface';
import { CrmService } from '../services/crm.service';

@Controller('call')
export class CrmController {
    constructor(private readonly crmService: CrmService) {}

    @Post()
    async crmInitCall(@Body() data: OnExternalCallStart) {
        await this.crmService.crmInitCall(data);
    }
}
