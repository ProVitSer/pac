import { ConfigService } from '@nestjs/config';
import { MailEnvironmentVariables } from './interfaces/config.interface';
import { MailerOptions } from '@nestjs-modules/mailer';
import * as path from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

export function mailConfig(config: ConfigService): MailerOptions {
    const mailConfig = config.get('mail') as MailEnvironmentVariables;
    return {
        transport: {
            host: mailConfig.host,
            port: mailConfig.port,
            secure: mailConfig.secure,
            auth: {
                user: mailConfig.auth.user,
                pass: mailConfig.auth.password,
            },
        },
        template: {
            dir: path.join(__dirname + '/../../modules/mail/' + 'templates'),
            adapter: new EjsAdapter(),
            options: {
                strict: false,
            },
        },
    };
}
