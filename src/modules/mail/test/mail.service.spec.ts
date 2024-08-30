import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from '../services/mail.service';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

describe('MailService', () => {
    let service: MailService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MailService,
                ConfigService,
                {
                    provide: MailerService,
                    useValue: {
                        sendMail: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<MailService>(MailService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});