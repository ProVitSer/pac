import { Module } from '@nestjs/common';
import { LicensesService } from './services/licenses.service';
import { LicensesController } from './controllers/licenses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licenses } from './entities/licenses.entity';
import { ClientModule } from '../client/client.module';
import { ProductModule } from '../product/product.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
    imports: [TypeOrmModule.forFeature([Licenses]), ScheduleModule.forRoot(), ClientModule, ProductModule, NotificationsModule],
    providers: [LicensesService],
    controllers: [LicensesController],
})
export class LicensesModule {}
