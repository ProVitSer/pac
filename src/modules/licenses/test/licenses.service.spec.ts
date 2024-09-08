/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerService } from '@nestjs/common';
import { Licenses } from '../entities/licenses.entity';
import { LicensesService } from '../services/licenses.service';
import { ClientService } from '../../../modules/client/services/client.service';
import { ProductsService } from '../../products/services/products.service';
import LicenseExistsException from '../exceptions/license-exists.exeption';
import LicenseNotFoundException from '../exceptions/license-not-found.exeption';
import { Products } from '../../products/entities/products.entity';
import UpdateLicenseDto from '../dto/update-license.dto';
import { NotificationsService } from '../../../modules/notifications/services/notifications.service';

describe('LicensesService', () => {
    let service: LicensesService;
    let licensesRepository: Repository<Licenses>;
    let clientService: ClientService;
    let notificationsService: NotificationsService;
    let productService: ProductsService;
    let logger: LoggerService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LicensesService,
                {
                    provide: getRepositoryToken(Licenses),
                    useClass: Repository,
                },
                {
                    provide: ClientService,
                    useValue: {
                        getClientByClientId: jest.fn(),
                    },
                },
                {
                    provide: ProductsService,
                    useValue: {
                        getProductById: jest.fn(),
                    },
                },
                {
                    provide: NotificationsService,
                    useValue: {
                        licenseCreateNotification: jest.fn(),
                    },
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

        service = module.get<LicensesService>(LicensesService);
        licensesRepository = module.get<Repository<Licenses>>(getRepositoryToken(Licenses));
        clientService = module.get<ClientService>(ClientService);
        productService = module.get<ProductsService>(ProductsService);
        notificationsService = module.get<NotificationsService>(NotificationsService);
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });

    describe('createLicense', () => {
        it('should create and return a new license', async () => {
            const createLicenseDto = { clientId: 1, productsId: [1, 2] };
            const client = { id: 1, clientId: 1 } as any;
            const products = [{ id: 1 }, { id: 2 }] as any[];

            jest.spyOn(licensesRepository, 'findOne').mockResolvedValueOnce(null);

            jest.spyOn(clientService, 'getClientByClientId').mockResolvedValueOnce(client);

            jest.spyOn<LicensesService, any>(service, 'getProducts').mockResolvedValueOnce(products);

            jest.spyOn(licensesRepository, 'create').mockReturnValue({} as any);

            jest.spyOn(licensesRepository, 'save').mockResolvedValueOnce({} as any);

            jest.spyOn(notificationsService, 'licenseCreateNotification').mockResolvedValueOnce({} as any);

            const result = await service.createLicense(createLicenseDto);

            expect(result).toBeDefined();

            expect(licensesRepository.findOne).toHaveBeenCalledWith({ where: { client: { client_id: createLicenseDto.clientId } } });

            expect(clientService.getClientByClientId).toHaveBeenCalledWith(createLicenseDto.clientId);

            expect(licensesRepository.create).toHaveBeenCalled();

            expect(licensesRepository.save).toHaveBeenCalled();
        });

        it('should throw LicenseExistsException if license already exists', async () => {
            const createLicenseDto = { clientId: 1, productsId: [1, 2] };

            const license: Licenses = { license: 'BFD1-6673-D960-F1D4', is_active: false } as any;

            jest.spyOn(licensesRepository, 'findOne').mockResolvedValueOnce(license);

            await expect(service.createLicense(createLicenseDto)).rejects.toThrow(LicenseExistsException);
        });
    });

    describe('active', () => {
        it('should return active status of the license', async () => {
            const license = { license: 'BFD1-6673-D960-F1D4', isActive: true } as any;

            jest.spyOn(licensesRepository, 'findOne').mockResolvedValueOnce(license);

            const result = await service.isLicenseActive({ license: 'BFD1-6673-D960-F1D4' });

            expect(result).toEqual({ isActive: true });

            expect(licensesRepository.findOne).toHaveBeenCalledWith({ where: { license: 'BFD1-6673-D960-F1D4' } });
        });
    });

    describe('activateLicense', () => {
        it('should activate the license', async () => {
            const license: Licenses = { license: 'BFD1-6673-D960-F1D4', isActive: false } as any;

            jest.spyOn(service, 'getLicenseInfo').mockResolvedValueOnce(license);

            const updateSpy = jest.spyOn(licensesRepository, 'update').mockResolvedValueOnce({} as any);

            await service.activateLicense({ license: 'BFD1-6673-D960-F1D4' });

            expect(updateSpy).toHaveBeenCalledWith(
                { license: 'BFD1-6673-D960-F1D4' },
                {
                    isActive: true,
                    activate: expect.any(Date),
                },
            );
        });

        it('should throw LicenseNotFoundException if license not found', async () => {
            jest.spyOn(service, 'getLicenseInfo').mockResolvedValueOnce(null);

            await expect(service.activateLicense({ license: 'BFD1-6673-D960-F1D4' })).rejects.toThrow(LicenseNotFoundException);
        });
    });

    describe('deactivateLicense', () => {
        it('should deactivate the license', async () => {
            const license: Licenses = { id: 1, license: 'BFD1-6673-D960-F1D4', isActive: true } as any;

            jest.spyOn(service, 'getLicenseInfo').mockResolvedValueOnce(license);
            const updateSpy = jest.spyOn(licensesRepository, 'update').mockResolvedValueOnce({} as any);

            await service.deactivateLicense({ license: 'BFD1-6673-D960-F1D4' });

            expect(updateSpy).toHaveBeenCalledWith({ id: license.id }, { is_active: false });
        });
    });

    describe('setLicenseCommercial', () => {
        it('should set the license to commercial', async () => {
            const license: Licenses = { id: 1, license: 'BFD1-6673-D960-F1D4', isTest: true } as any;

            jest.spyOn(service, 'getLicenseInfo').mockResolvedValueOnce(license);
            const updateSpy = jest.spyOn(licensesRepository, 'update').mockResolvedValueOnce({} as any);

            await service.setLicenseCommercial({ license: 'BFD1-6673-D960-F1D4' });

            expect(updateSpy).toHaveBeenCalledWith({ id: license.id }, { isTest: false, isActive: true });
        });
    });

    describe('updateLicense', () => {
        it('should update the license and add new products', async () => {
            const existingProducts: Products[] = [{ id: 1 }, { id: 2 }] as any[];
            const newProducts: Products[] = [{ id: 3 }] as any[];
            const updateLicenseDto: UpdateLicenseDto = { license: 'BFD1-6673-D960-F1D4', productsId: [3], isActive: true };
            const license: Licenses = { id: 1, products: existingProducts, license: 'BFD1-6673-D960-F1D4' } as any;

            jest.spyOn(service, 'getLicenseInfo').mockResolvedValueOnce(license);

            jest.spyOn<LicensesService, any>(service, 'getProducts').mockResolvedValueOnce(newProducts);

            const saveSpy = jest.spyOn(licensesRepository, 'save').mockResolvedValueOnce(license);

            const result = await service.updateLicense({ ...updateLicenseDto });

            expect(result.products.length).toBe(3);
            expect(saveSpy).toHaveBeenCalledWith(
                expect.objectContaining({ products: expect.arrayContaining([...existingProducts, ...newProducts]) }),
            );
        });
    });

    describe('getLicense', () => {
        it('should return a license with client and products relations', async () => {
            const license = { license: 'BFD1-6673-D960-F1D4', client: {}, products: [] } as any;

            jest.spyOn(licensesRepository, 'findOne').mockResolvedValueOnce(license);

            const result = await service.getLicenseInfo('BFD1-6673-D960-F1D4');

            expect(result).toBe(license);

            expect(licensesRepository.findOne).toHaveBeenCalledWith({
                where: { license: 'BFD1-6673-D960-F1D4' },
                relations: { client: true, products: true },
            });
        });

        it('should throw LicenseNotFoundException if license not found', async () => {
            jest.spyOn(licensesRepository, 'findOne').mockResolvedValueOnce(null);

            await expect(service.getLicenseInfo('BFD1-6673-D960-F1D4')).rejects.toThrow(LicenseNotFoundException);
        });
    });
});
