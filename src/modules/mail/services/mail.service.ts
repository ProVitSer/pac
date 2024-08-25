import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { AttachmentsData, SendMailData } from '../interfaces/mail.interface';
import { Attachment } from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
import { MailEnvironmentVariables } from '@app/common/config/interfaces/config.interface';

@Injectable()
export class MailService {
    constructor(
        private readonly configService: ConfigService,
        private readonly mailerService: MailerService,
    ) {}

    public async sendMail(data: SendMailData): Promise<void> {
        try {
            const mailData = this.formatMailData(data);

            await this.mailerService.sendMail(mailData);
        } catch (e) {
            console.log(e);
        }
    }

    private formatMailData({ from, to, subject, context, template, attachments }: SendMailData): ISendMailOptions {
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
