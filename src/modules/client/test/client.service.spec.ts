import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mock, instance } from 'ts-mockito';
import { Client } from '../entities/client.entity';
import { ClientService } from '../services/client.service';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { clients } from '../mocks/clients';

describe('ClientsService', () => {
    let service: ClientService;
    let repository: Repository<Client>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let logger: LoggerService;

    beforeEach(async () => {
        const mockedRepository = mock<Repository<Client>>(Repository);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ClientService,
                {
                    provide: getRepositoryToken(Client),
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

        service = module.get<ClientService>(ClientService);
        repository = module.get<Repository<Client>>(getRepositoryToken(Client));
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a company', async () => {
        jest.spyOn(repository, 'create').mockReturnValue(clients[0]);

        jest.spyOn(repository, 'save').mockResolvedValue(clients[0]);

        const result = await service.createCompany(clients[0]);

        expect(result).toEqual(clients[0]);
    });

    it('should return all companies', async () => {
        jest.spyOn(repository, 'create').mockReturnValue(clients[1]);

        jest.spyOn(repository, 'save').mockResolvedValue(clients[1]);

        await service.createCompany(clients[1]);

        jest.spyOn(repository, 'find').mockResolvedValue(clients);

        const result = await service.getCompanies();

        expect(result).toEqual(clients);
    });

    it('should return a company by id', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(clients[1]);

        const result = await service.getCompanyById(2);

        expect(result).toEqual(clients[1]);
    });

    it('should update a company', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { company_name, ...otherCompanyInfo } = clients[0];

        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);

        jest.spyOn(repository, 'findOne').mockResolvedValue({ ...otherCompanyInfo, company_name: clients[1].company_name });

        const result = await service.updateCompany(1, { company_name: clients[1].company_name });

        expect(result).toEqual({ ...otherCompanyInfo, company_name: clients[1].company_name });
    });

    it('should throw an error if trying to update a non-existent company', async () => {
        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any);

        await expect(service.updateCompany(3, { company_name: clients[1].company_name })).rejects.toThrow();
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
