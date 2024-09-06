/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AmqpService } from '../services/amqp.service';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Exchange, Queues, RoutingKey } from '../../../common/constants/amqp';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

describe('AmqpService', () => {
    let service: AmqpService;
    let logger: LoggerService;
    let amqpConnection: AmqpConnection;

    beforeEach(async () => {
        const mockChannel = {
            assertExchange: jest.fn().mockResolvedValue(true),
            assertQueue: jest.fn().mockResolvedValue(true),
            bindQueue: jest.fn().mockResolvedValue(true),
        };

        const mockAmqpConnection = {
            managedChannel: {
                on: jest.fn().mockImplementation((event, callback) => {
                    if (event === 'connect') {
                        callback();
                    }
                }),
            },
            channel: mockChannel,
            publish: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AmqpService,
                {
                    provide: AmqpConnection,
                    useValue: mockAmqpConnection,
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
        amqpConnection = module.get<AmqpConnection>(AmqpConnection);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should initialize AMQP connection and setup exchanges and queues', async () => {
        // Проверяем, что на событие 'connect' был установлен обработчик
        expect(amqpConnection.managedChannel.on).toHaveBeenCalledWith('connect', expect.any(Function));

        // Проверяем, что методы assertExchange и assertQueue были вызваны
        expect(amqpConnection.channel.assertExchange).toHaveBeenCalledTimes(Object.keys(Exchange).length);
        expect(amqpConnection.channel.assertQueue).toHaveBeenCalledTimes(Object.keys(Queues).length);
        expect(amqpConnection.channel.bindQueue).toHaveBeenCalledWith(Queues.events, Exchange.events, RoutingKey.mail);
    });
});
