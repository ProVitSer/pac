import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ClientService } from '../services/client.service';
import { Client } from '../entities/client.entity';
import { CreateCompanyDto } from '../dto/create-client.dto';
import { UpdateCompanyDto } from '../dto/update-client.dto';

@Controller()
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @Post()
    async createCompany(@Body() company: CreateCompanyDto): Promise<Client> {
        return this.clientService.createCompany(company);
    }

    @Get()
    async getCompanies(): Promise<Client[]> {
        return this.clientService.getCompanies();
    }

    @Get(':id')
    async getCompanyById(@Param('id') id: number): Promise<Client> {
        return this.clientService.getCompanyById(id);
    }

    @Put(':id')
    async updateCompany(@Param('id') id: number, @Body() company: UpdateCompanyDto): Promise<Client> {
        return this.clientService.updateCompany(id, company);
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: number): Promise<void> {
        return this.clientService.deleteCompany(id);
    }
}
