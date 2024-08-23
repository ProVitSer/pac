import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ErrorsInterceptor } from '@app/common/interceptors/errors.interceptor';

@UseInterceptors(ErrorsInterceptor)
@Controller()
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createCompany(@Body() client: CreateClientDto): Promise<Client> {
        return this.clientService.createClient(client);
    }

    @Get()
    async getCompanies(): Promise<Client[]> {
        return this.clientService.getClients();
    }

    @Get(':clientId')
    async getClientByClientId(@Param('clientId') clientId: number): Promise<Client> {
        return this.clientService.getClientByClientId(clientId);
    }

    @Put(':clientId')
    async updateClient(@Param('clientId') clientId: number, @Body() client: UpdateClientDto): Promise<Client> {
        return this.clientService.updateClient(clientId, client);
    }

    @Delete(':clientId')
    async deleteClient(@Param('clientId') clientId: number): Promise<void> {
        return this.clientService.deleteClient(clientId);
    }
}
