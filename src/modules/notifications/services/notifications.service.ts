import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LicenseCreateNotification, LicenseDeactivateNotification, LicenseExpireNotification } from '../interfaces/notifications.interface';
import {
    LicenseCreateContext,
    LicenseDeactivateContext,
    LicenseExpireContext,
    SendMailData,
} from '@app/modules/mail/interfaces/mail.interface';
import { Exchange, RoutingKey } from '../../../common/constants/amqp';
import { LICENSE_CREATE, LICENSE_DEACTIVATE, LICENSE_EXPIRE } from '../../../common/constants/subject';
import { TemplateTypes } from '../../../common/constants/templates';
import { AmqpService } from '../../../modules/amqp/services/amqp.service';
import { format } from 'date-fns';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly amqpService: AmqpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async licenseCreateNotification(data: LicenseCreateNotification) {
        try {
            const mailData: SendMailData<LicenseCreateContext> = {
                to: data.client.email,
                context: {
                    license: data.license.license,
                    fio: `${data.client.contact_person_name}`,
                    expiration_date: format(data.license.expiration_date, 'dd.MM.yyyy'),
                },
                template: TemplateTypes.LicenseCreate,
                subject: LICENSE_CREATE,
            };

            this.amqpService.sendMessage(Exchange.events, RoutingKey.mail, mailData);
        } catch (e) {
            this.logger.error(e);
        }
    }

    public async licenseExpireNotification(data: LicenseExpireNotification) {
        try {
            const mailData: SendMailData<LicenseExpireContext> = {
                to: data.client.email,
                context: {
                    license: data.license.license,
                    fio: `${data.client.contact_person_name}`,
                    expiration_date: format(data.license.expiration_date, 'dd.MM.yyyy'),
                    expiration_day: data.day,
                },
                template: TemplateTypes.LicenseExpire,
                subject: LICENSE_EXPIRE,
            };

            this.amqpService.sendMessage(Exchange.events, RoutingKey.mail, mailData);
        } catch (e) {
            this.logger.error(e);
        }
    }

    public async licenseDeactivateNotification(data: LicenseDeactivateNotification) {
        try {
            const mailData: SendMailData<LicenseDeactivateContext> = {
                to: data.client.email,
                context: {
                    license: data.license.license,
                    fio: `${data.client.contact_person_name}`,
                    expiration_date: format(data.license.expiration_date, 'dd.MM.yyyy'),
                },
                template: TemplateTypes.LicenseDeactivate,
                subject: LICENSE_DEACTIVATE,
            };

            this.amqpService.sendMessage(Exchange.events, RoutingKey.mail, mailData);
        } catch (e) {
            this.logger.error(e);
        }
    }
}
