/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AmqpService } from '../services/amqp.service';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

describe('AmqpService', () => {
    let service: AmqpService;
    let logger: LoggerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AmqpService,
                ConfigService,
                {
                    provide: AmqpService,
                    useValue: {
                        sendMail: jest.fn(),
                    },
                },
                {
                    provide: WINSTON_MODULE_NEST_PROVIDER,
                    useValue: {
                        log: jest.fn(),
                        warn: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<AmqpService>(AmqpService);
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
