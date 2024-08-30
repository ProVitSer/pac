import { Client } from '@app/modules/client/entities/client.entity';
import { Licenses } from '@app/modules/licenses/entities/licenses.entity';

export interface LicenseCreateNotification {
    license: Licenses;
    client: Client;
}

export interface LicenseExpireNotification extends LicenseCreateNotification {
    day: string;
}

export interface LicenseDeactivateNotification extends LicenseCreateNotification {}