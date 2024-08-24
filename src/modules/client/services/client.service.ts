import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import ClientNotFoundException from '../exceptions/client-not-found.exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { UniqueClientFields } from '../interfaces/client.interface';
import ClientExistsException from '../exceptions/client-exists.exeption';
import { getUnixTime } from 'date-fns';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepository: Repository<Client>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async createClient(clientData: Partial<Client>): Promise<Client> {
        const client = await this.checkClientByUniqueFileds({ phone: clientData.phone, email: clientData.email });

        if (client) {
            throw new ClientExistsException(`number ${clientData.phone} or ${clientData.email}`);
        }

        const newClient = await this.clientRepository.create({
            client_id: this.generateClientId(),
            ...clientData,
        });
        await this.clientRepository.save(newClient);

        return newClient;
    }

    public async getClients(): Promise<Client[]> {
        return this.clientRepository.find({
            where: { deleted: false },
            relations: {
                licenses: true,
            },
        });
    }

    public async getClientByClientId(clientId: number): Promise<Client> {
        const client = await this.clientRepository.findOne({
            where: { client_id: clientId, deleted: false },
            relations: {
                licenses: true,
            },
        });

        if (!client) {
            throw new ClientNotFoundException(clientId);
        }

        return client;
    }

    public async updateClient(clientId: number, updateData: Partial<Client>): Promise<Client> {
        const client = await this.clientRepository.findOne({
            where: {
                client_id: clientId,
                deleted: false,
            },
        });
        if (!client) {
            throw new ClientNotFoundException(clientId);
        }

        await this.clientRepository.update({ id: client.id }, updateData);

        return await this.getClientByClientId(clientId);
    }

    public async deleteClient(clientId: number): Promise<void> {
        const client = await this.getClientByClientId(clientId);

        await this.clientRepository.update({ id: client.id }, { deleted: true });
    }

    private async checkClientByUniqueFileds(data: UniqueClientFields): Promise<Client> {
        return await this.clientRepository.findOne({
            where: [{ phone: data.phone }, { email: data.email }],
        });
    }

    private generateClientId(): number {
        return getUnixTime(new Date());
    }
}
