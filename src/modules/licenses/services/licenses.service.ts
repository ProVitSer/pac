import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Licenses } from '../entities/licenses.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import CreateLicenseDto from '../dto/create-license.dto';
import CheckLicenseDto from '../dto/check-license.dto';
import DeactivateLicenseDto from '../dto/deactivate-license.dto';
import UpdateLicenseDto from '../dto/update-license.dto';
import LicenseCommercialDto from '../dto/license-commercial.dto';
import LicenseExistsException from '../exceptions/license-exists.exeption';
import ActivateLicenseDto from '../dto/activate-license.dto';
import { addMonths } from 'date-fns';
import LicenseNotFoundException from '../exceptions/license-not-found.exeption';
import { ClientService } from '../../../modules/client/services/client.service';
import { Client } from '@app/modules/client/entities/client.entity';
import { Product } from '@app/modules/product/entities/product.entity';
import { ProductService } from '../../../modules/product/services/product.service';
import { ActiveLicenseResponse } from '../interfaces/licenses.interface';
import { NotificationsService } from '../../../modules/notifications/services/notifications.service';

@Injectable()
export class LicensesService {
    constructor(
        @InjectRepository(Licenses)
        private readonly licensesRepository: Repository<Licenses>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly clientService: ClientService,
        private readonly productService: ProductService,
        private readonly notificationsService: NotificationsService,
    ) {}

    public async createLicense(data: CreateLicenseDto): Promise<Licenses> {
        const license = await this.licensesRepository.findOne({
            where: {
                client: {
                    client_id: data.client_id,
                },
            },
        });

        if (license) {
            throw new LicenseExistsException(data.client_id);
        }

        const client = await this.clientService.getClientByClientId(data.client_id);

        const products = await this.getProducts(data.products_id);

        const newLicense = await this.licensesRepository.create(await this.createLicenseData(data, client, products));

        await this.licensesRepository.save(newLicense);

        await this.notificationsService.licenseCreateNotification({ client, license: newLicense });

        return newLicense;
    }

    public async isLicenseActive(data: CheckLicenseDto): Promise<ActiveLicenseResponse> {
        const lic = await this.licensesRepository.findOne({
            where: { license: data.license },
        });
        return { is_active: lic.is_active };
    }

    public async activateLicense(data: ActivateLicenseDto): Promise<void> {
        const licenses = await this.getLicenseInfo(data.license);

        if (!licenses) {
            throw new LicenseNotFoundException(data.license);
        }

        await this.licensesRepository.update(
            { license: data.license },
            {
                is_active: true,
                activate: new Date(),
            },
        );
    }

    public async deactivateLicense(data: DeactivateLicenseDto): Promise<void> {
        const license = await this.getLicenseInfo(data.license);

        await this.licensesRepository.update({ id: license.id }, { is_active: false });
    }

    public async setLicenseCommercial(data: LicenseCommercialDto): Promise<void> {
        const license = await this.getLicenseInfo(data.license);

        await this.licensesRepository.update({ id: license.id }, { is_test: false, is_active: true });
    }

    public async updateLicense(data: UpdateLicenseDto): Promise<Licenses> {
        const { products_id, license, ...updateData } = data;

        const lic = await this.getLicenseInfo(license);

        if (products_id) {
            const products = await this.getProducts(data.products_id);

            const existingProductIds = new Set(lic.products.map((product) => product.id));

            for (const product of products) {
                if (!existingProductIds.has(product.id)) {
                    lic.products.push(product);
                }
            }
        }

        Object.assign(lic, updateData);

        await this.licensesRepository.save(lic);

        return lic;
    }

    public async getLicenseInfo(license: string): Promise<Licenses> {
        const lic = await this.licensesRepository.findOne({
            where: { license: license },
            relations: {
                client: true,
                products: true,
            },
        });

        if (!lic) {
            throw new LicenseNotFoundException(license);
        }

        return lic;
    }

    public async getLicenses(): Promise<Licenses[]> {
        return this.licensesRepository.find({
            relations: {
                client: true,
                products: true,
            },
        });
    }

    private async getProducts(products_id: number[]): Promise<Product[]> {
        return await Promise.all(
            products_id.map(async (id: number) => {
                return await this.productService.getProductById(id);
            }),
        );
    }

    private async createLicenseData(data: CreateLicenseDto, client: Client, products: Product[]): Promise<Partial<Licenses>> {
        return {
            license: this.generateLicense(),
            products,
            expiration_date: addMonths(new Date(), 1),
            client,
        };
    }

    private generateLicense(): string {
        return `${this.generateLicenseSegment()}-${this.generateLicenseSegment()}-${this.generateLicenseSegment()}-${this.generateLicenseSegment()}`;
    }

    private generateLicenseSegment(): string {
        return randomBytes(2).toString('hex').toUpperCase();
    }
}
