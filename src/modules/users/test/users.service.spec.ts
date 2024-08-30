/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../services/users.service';
import { Users } from '../entities/users.entity';
import { LoggerService } from '@nestjs/common';
import { Repository } from 'typeorm';
import { instance, mock } from 'ts-mockito';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
    let service: UsersService;
    let repository: Repository<Users>;
    let logger: LoggerService;

    beforeEach(async () => {
        const mockedRepository = mock<Repository<Users>>(Repository);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(Users),
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

        service = module.get<UsersService>(UsersService);
        repository = module.get<Repository<Users>>(getRepositoryToken(Users));
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
