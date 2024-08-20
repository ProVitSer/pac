import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mock, instance } from 'ts-mockito';
import { Company } from '../entities/company.entity';
import { CompaniesService } from '../services/companies.service';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { companies } from '../mocks/company';

describe('CompaniesService', () => {
    let service: CompaniesService;
    let repository: Repository<Company>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let logger: LoggerService;

    beforeEach(async () => {
        const mockedRepository = mock<Repository<Company>>(Repository);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompaniesService,
                {
                    provide: getRepositoryToken(Company),
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

        service = module.get<CompaniesService>(CompaniesService);
        repository = module.get<Repository<Company>>(getRepositoryToken(Company));
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a company', async () => {
        jest.spyOn(repository, 'create').mockReturnValue(companies[0]);

        jest.spyOn(repository, 'save').mockResolvedValue(companies[0]);

        const result = await service.createCompany(companies[0]);

        expect(result).toEqual(companies[0]);
    });

    it('should return all companies', async () => {
        jest.spyOn(repository, 'create').mockReturnValue(companies[1]);

        jest.spyOn(repository, 'save').mockResolvedValue(companies[1]);

        await service.createCompany(companies[1]);

        jest.spyOn(repository, 'find').mockResolvedValue(companies);

        const result = await service.getCompanies();

        expect(result).toEqual(companies);
    });

    it('should return a company by id', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(companies[1]);

        const result = await service.getCompanyById(2);

        expect(result).toEqual(companies[1]);
    });

    it('should update a company', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { name, ...otherCompanyInfo } = companies[0];

        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);

        jest.spyOn(repository, 'findOne').mockResolvedValue({ ...otherCompanyInfo, name: companies[1].name });

        const result = await service.updateCompany(1, { name: companies[1].name });

        expect(result).toEqual({ ...otherCompanyInfo, name: companies[1].name });
    });

    it('should throw an error if trying to update a non-existent company', async () => {
        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any);

        await expect(service.updateCompany(3, { name: companies[1].name })).rejects.toThrow();
    });

    it('should delete a company', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

        await expect(service.deleteCompany(1)).resolves.toBeUndefined();
    });

    it('should throw an error if trying to delete a non-existent company', async () => {
        jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0 } as any);

        await expect(service.deleteCompany(1)).rejects.toThrow();
    });
});
