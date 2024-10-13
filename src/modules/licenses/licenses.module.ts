import { Module } from '@nestjs/common';
import { LicensesService } from './services/licenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licenses } from './entities/licenses.entity';
import { ClientModule } from '../client/client.module';
import { ProductsModule } from '../products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from '../notifications/notifications.module';
import { ExpireLicenseSchedule } from './schedules/expire-license.schedule';
import { DeactivateLicenseSchedule } from './schedules/deactivate-license.schedule';

@Module({
    imports: [TypeOrmModule.forFeature([Licenses]), ScheduleModule.forRoot(), ClientModule, ProductsModule, NotificationsModule],
    providers: [LicensesService, ExpireLicenseSchedule, DeactivateLicenseSchedule],
    exports: [LicensesService],
})
export class LicensesModule {}
