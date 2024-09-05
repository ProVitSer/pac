/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from '../services/files.service';
import { LoggerService } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { mock, instance } from 'ts-mockito';
import { Repository } from 'typeorm';
import { Files } from '../entities/files.entity';
import { ConfigService } from '@nestjs/config';

describe('FilesService', () => {
    let service: FilesService;
    let repository: Repository<Files>;
    let logger: LoggerService;
    let configService: ConfigService;

    beforeEach(async () => {
        const mockedRepository = mock<Repository<Files>>(Repository);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FilesService,
                ConfigService,
                {
                    provide: getRepositoryToken(Files),
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

        service = module.get<FilesService>(FilesService);
        configService = module.get<ConfigService>(ConfigService);
        repository = module.get<Repository<Files>>(getRepositoryToken(Files));
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
