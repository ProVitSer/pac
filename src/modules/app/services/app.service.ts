import { Injectable } from '@nestjs/common';
import { formatDuration, intervalToDuration } from 'date-fns';
import * as packageJson from '../../../../package.json';
import { Health } from '@app/common/interfaces/interfaces';

@Injectable()
export class AppService {
    async getHealth(): Promise<Health> {
        return {
            version: packageJson.version,
            uptime: formatUptime(process.uptime()),
            seconds: process.uptime(),
        };
    }
}

function formatUptime(uptime) {
    const duration = intervalToDuration({ start: 0, end: uptime * 1000 });
    return formatDuration(duration, { format: ['days', 'hours', 'minutes', 'seconds'] });
}
