import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LicenseCreateNotification } from '../interfaces/notifications.interface';
import { SendMailData } from '@app/modules/mail/interfaces/mail.interface';
import { Exchange, RoutingKey } from '../../../common/constants/amqp';
import { LICENSE_CREATE } from '../../../common/constants/subject';
import { TemplateTypes } from '../../../common/constants/templates';
import { AmqpService } from '../../../modules/amqp/services/amqp.service';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly amqpService: AmqpService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
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
