import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Role } from '@app/common/interfaces/enums';
import JwtAuthenticationGuard from '@app/modules/auth/guards/jwt-authentication.guard';
import RoleGuard from '@app/modules/auth/guards/role.guard';

@UseGuards(RoleGuard([Role.Admin]))
@UseGuards(JwtAuthenticationGuard)
@Controller()
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createClient(@Body() client: CreateClientDto): Promise<Client> {
        return this.clientService.createClient(client);
    }

    @Get()
    async getClients(): Promise<Client[]> {
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
