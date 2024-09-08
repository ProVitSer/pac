import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LicensesService } from '../services/licenses.service';
import { getUnixTime } from 'date-fns';
import { NotificationsService } from '@app/modules/notifications/services/notifications.service';

@Injectable()
export class DeactivateLicenseSchedule {
    constructor(
        private readonly licensesService: LicensesService,
        private readonly notificationsService: NotificationsService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    public async checkLicenseToDeactivate() {
        const licenses = await this.licensesService.getLicenses();

        for (const license of licenses) {
            if (getUnixTime(license.expirationDate) < getUnixTime(new Date())) {
                await this.licensesService.deactivateLicense({ license: license.license });
                await this.notificationsService.licenseDeactivateNotification({ client: license.client, license });
            }
        }
    }
}
