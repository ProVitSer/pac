import { Test, TestingModule } from '@nestjs/testing';
import { CdrService } from '../services/cdr.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock, instance } from 'ts-mockito';
import { Repository } from 'typeorm';
import { Cdr } from '../entities/cdr.entity';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

describe('CdrService', () => {
    let service: CdrService;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let repository: Repository<Cdr>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let logger: LoggerService;

    beforeEach(async () => {
        const mockedRepository = mock<Repository<Cdr>>(Repository);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CdrService,
                {
                    provide: getRepositoryToken(Cdr),
                    useValue: instance(mockedRepository),
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

        service = module.get<CdrService>(CdrService);
        repository = module.get<Repository<Cdr>>(getRepositoryToken(Cdr));
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
