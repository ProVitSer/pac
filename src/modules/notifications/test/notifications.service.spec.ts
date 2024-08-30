/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { NotificationsService } from '../services/notifications.service';
import { AmqpService } from '../../../modules/amqp/services/amqp.service';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

describe('NotificationsService', () => {
    let service: NotificationsService;
    let amqpService: AmqpService;
    let logger: LoggerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                NotificationsService,
                AmqpService,
                {
                    provide: AmqpConnection,
                    useValue: {
                        managedChannel: {
                            on: jest.fn((event, callback) => callback()),
                        },
                        publish: jest.fn(),
                    },
                },
                {
                    provide: WINSTON_MODULE_NEST_PROVIDER,
                    useValue: {
                        log: jest.fn(),
                        error: jest.fn(),
                    },
                },
            ],
        }).compile();

        service = module.get<NotificationsService>(NotificationsService);
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
        amqpService = module.get<AmqpService>(AmqpService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
