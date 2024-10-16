import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { AttachmentsData, Contexts, SendMailData } from '../interfaces/mail.interface';
import { Attachment } from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { MailEnvironmentVariables } from '@app/common/config/interfaces/config.interface';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class MailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async sendMail(data: SendMailData<Contexts>): Promise<void> {
        try {
            const mailData = this.formatMailData(data);

            await this.mailerService.sendMail(mailData);
        } catch (e) {
            this.logger.error(e);
        }
    }

    private formatMailData({ from, to, subject, context, template, attachments }: SendMailData<Contexts>): ISendMailOptions {
        const mailData = {
            from: from || this.configService.get<MailEnvironmentVariables>('mail').from,
            to,
            subject,
            context,
            template,
        };

        const att = !!attachments ? { attachments: this.getAttachmentStruct(attachments) } : {};

        Object.assign(mailData, att);

        return mailData;
    }

    private getAttachmentStruct(attachments: AttachmentsData[]): Attachment[] {
        const atts: Attachment[] = [];

        attachments.map((att) => {
            atts.push({
                path: att.path,
                filename: att.filename,
                contentDisposition: 'attachment',
            });
        });

        return atts;
    }
}
