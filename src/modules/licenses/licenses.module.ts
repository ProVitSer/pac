import { Module } from '@nestjs/common';
import { LicensesService } from './services/licenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Licenses } from './entities/licenses.entity';
import { ClientModule } from '../client/client.module';
import { ProductsModule } from '../products/products.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationsModule } from '../notifications/notifications.module';
import { DeactivateLicenseSchedule } from './schedules/deactivate-license.schedule';
import { CheckLicenseSchedule } from './schedules/check-license.schedule';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [
        TypeOrmModule.forFeature([Licenses]),
        ScheduleModule.forRoot(),
        ClientModule,
        ProductsModule,
        NotificationsModule,
        HttpModule,
    ],
    providers: [LicensesService, DeactivateLicenseSchedule, CheckLicenseSchedule],
    exports: [LicensesService],
})
export class LicensesModule {}
