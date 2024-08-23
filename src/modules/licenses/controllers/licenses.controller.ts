import { Controller } from '@nestjs/common';
import { LicensesService } from '../services/licenses.service';

@Controller()
export class LicensesController {
    constructor(private readonly licensesService: LicensesService) {}

    // @Post('validate')
    // async validateLicense(@Body() features: string[]): Promise<boolean> {}
}
