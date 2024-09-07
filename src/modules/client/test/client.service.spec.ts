import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { mock, instance } from 'ts-mockito';
import { Client } from '../entities/client.entity';
import { ClientService } from '../services/client.service';
import { LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { clients } from '../mocks/clients';
import ClientExistsException from '../exceptions/client-exists.exeption';
import ClientNotFoundException from '../exceptions/client-not-found.exception';
import CreateClientDto from '../dto/create-client.dto';

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

    it('should create a client', async () => {
        jest.spyOn(repository, 'create').mockReturnValue(clients[0]);

        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 0 } as any);

        jest.spyOn(repository, 'save').mockResolvedValue(clients[0]);

        const createUser = {
            company_name: clients[0].company_name,
            contact_person_name: clients[0].contact_person_name,
            company_phone: clients[0].phone,
            company_email: clients[0].email,
        };

        const result = await service.createClient(createUser);

        expect(result).toEqual(clients[0]);

        // expect(repository.create).toHaveBeenCalledWith(expect.objectContaining(clients[0]));

        expect(repository.save).toHaveBeenCalledWith(clients[0]);
    });

    it('should throw an error if trying create exists client', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(clients[0]);

        await expect(service.createClient(clients[0] as unknown as CreateClientDto)).rejects.toThrow(ClientExistsException);
    });

    it('should return all client', async () => {
        jest.spyOn(repository, 'find').mockResolvedValue(clients);

        const result = await service.getClients();

        expect(result).toEqual(clients);

        expect(repository.find).toHaveBeenCalledWith({
            where: { deleted: false },
            relations: {
                licenses: true,
            },
        });
    });

    it('should return a client by id', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(clients[1]);

        const result = await service.getClientByClientId(clients[1].client_id);

        expect(result).toEqual(clients[1]);

        expect(repository.findOne).toHaveBeenCalledWith({
            where: { client_id: clients[1].client_id, deleted: false },
            relations: { licenses: true },
        });
    });

    it('should throw an error if trying search not exists client', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.getClientByClientId(clients[1].client_id)).rejects.toThrow(ClientNotFoundException);
    });

    it('should update a client', async () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const updatedClient = { ...clients[0], company_name: clients[1].company_name };

        jest.spyOn(repository, 'findOne').mockResolvedValue(clients[0]);
        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);
        jest.spyOn(repository, 'findOne').mockResolvedValue(updatedClient);

        const result = await service.updateClient(clients[0].client_id, { company_name: clients[1].company_name });

        expect(result).toEqual(updatedClient);
        expect(repository.update).toHaveBeenCalledWith({ id: clients[0].id }, { company_name: clients[1].company_name });
    });

    it('should throw an error if trying to update a non-existent client', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.updateClient(clients[2].client_id, { company_name: clients[1].company_name })).rejects.toThrow(
            ClientNotFoundException,
        );
    });

    it('should delete a client', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(clients[1]);

        jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1 } as any);

        await service.deleteClient(clients[1].client_id);

        expect(repository.update).toHaveBeenCalledWith({ id: clients[1].id }, { deleted: true });
    });

    it('should throw an error if trying to delete a non-existent client', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.deleteClient(clients[2].client_id)).rejects.toThrow(ClientNotFoundException);
    });
});
