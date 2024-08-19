import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CompaniesService } from '../services/companies.service';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Controller()
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    async createCompany(@Body() company: CreateCompanyDto): Promise<Company> {
        return this.companiesService.createCompany(company);
    }

    @Get()
    async getCompanies(): Promise<Company[]> {
        return this.companiesService.getCompanies();
    }

    @Get(':id')
    async getCompanyById(@Param('id') id: number): Promise<Company> {
        return this.companiesService.getCompanyById(id);
    }

    @Put(':id')
    async updateCompany(@Param('id') id: number, @Body() company: UpdateCompanyDto): Promise<Company> {
        return this.companiesService.updateCompany(id, company);
    }

    @Delete(':id')
    async deleteCompany(@Param('id') id: number): Promise<void> {
        return this.companiesService.deleteCompany(id);
    }
}
