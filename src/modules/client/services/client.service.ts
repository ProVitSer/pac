import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import CompanyNotFoundException from '../exceptions/client-not-found.exception';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private companiesRepository: Repository<Client>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async createCompany(companyData: Partial<Client>): Promise<Client> {
        const newCompany = await this.companiesRepository.create({
            ...companyData,
        });
        await this.companiesRepository.save(newCompany);

        return newCompany;
    }

    public async getCompanies(): Promise<Client[]> {
        return this.companiesRepository.find({ relations: ['licenses'] });
    }

    public async getCompanyById(id: number): Promise<Client> {
        const company = await this.companiesRepository.findOne({
            where: { id },
            relations: {
                licenses: true,
            },
        });
        if (company) {
            return company;
        }
        this.logger.warn('Tried to access a company that does not exist');
        throw new CompanyNotFoundException(id);
    }

    public async updateCompany(id: number, updateData: Partial<Client>): Promise<Client> {
        await this.companiesRepository.update(id, updateData);
        const updatedCompany = await this.companiesRepository.findOne({
            where: {
                id,
            },
        });
        if (updatedCompany) {
            return updatedCompany;
        }
        throw new CompanyNotFoundException(id);
    }

    public async deleteCompany(id: number): Promise<void> {
        const deleteResponse = await this.companiesRepository.delete(id);

        if (!deleteResponse.affected) {
            throw new CompanyNotFoundException(id);
        }
    }
}
