import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LicensesService } from '../services/licenses.service';
import { differenceInDays } from 'date-fns';
import { NotificationsService } from '@app/modules/notifications/services/notifications.service';
import { EXPIRE_DAY } from '@app/common/constants/license';

@Injectable()
export class ExpireLicenseSchedule {
    constructor(
        private readonly licensesService: LicensesService,
        private readonly notificationsService: NotificationsService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async checkLicenseExpire() {
        const licenses = await this.licensesService.getLicenses();

        for (const license of licenses) {
            const difference = differenceInDays(license.expirationDate, new Date());
            if (difference == EXPIRE_DAY) {
                await this.notificationsService.licenseExpireNotification({ client: license.client, license, day: String(difference) });
            }
        }
    }
}
