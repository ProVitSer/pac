import { AmqpService } from '@app/modules/amqp/services/amqp.service';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LicenseCreateNotification } from '../interfaces/notifications.interface';
import { SendMailData } from '@app/modules/mail/interfaces/mail.interface';
import { Exchange, RoutingKey } from '@app/common/constants/amqp';
import { LICENSE_CREATE } from '@app/common/constants/subject';
import { TemplateTypes } from '@app/common/constants/templates';

@Injectable()
export class NotificationsService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly amqpService: AmqpService,
    ) {}

    public async licenseCreateNotification(data: LicenseCreateNotification) {
        try {
            const mailData: SendMailData = {
                to: data.email,
                context: { license: data.license },
                template: TemplateTypes.LicenseCreate,
                subject: LICENSE_CREATE,
            };

            this.amqpService.sendMessage(Exchange.events, RoutingKey.mail, mailData);
        } catch (e) {
            this.logger.error(e);
        }
    }
}
