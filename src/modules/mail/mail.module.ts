import { Module } from '@nestjs/common';
import { MailService } from './services/mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailConfig } from '@app/common/config/mail.config';
import { MailListenters } from './listenters/mail.listenters';

@Module({
    imports: [
        MailerModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return mailConfig(configService);
            },
        }),
    ],
    providers: [MailService, MailListenters],
})
export class MailModule {}
