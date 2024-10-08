import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CrmSyncUsersSchedule {
    constructor() {}

    @Cron(CronExpression.EVERY_MINUTE)
    async check() {}
}
