import { Module } from '@nestjs/common';
import { LicensesService } from './services/licenses.service';
import { LicensesController } from './controllers/licenses.controller';

@Module({
    providers: [LicensesService],
    controllers: [LicensesController],
})
export class LicensesModule {}
