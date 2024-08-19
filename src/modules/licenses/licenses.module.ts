import { Module } from '@nestjs/common';
import { LicensesService } from './services/licenses.service';
import { LicensesController } from './controllers/licenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { License } from './entities/license.entity';

@Module({
    imports: [TypeOrmModule.forFeature([License])],
    providers: [LicensesService],
    controllers: [LicensesController],
})
export class LicensesModule {}
