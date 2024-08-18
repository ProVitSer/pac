import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Health } from '@app/common/interfaces';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('health')
    getHealth(): Promise<Health> {
        return this.appService.getHealth();
    }
}
