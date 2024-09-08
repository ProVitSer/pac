/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../services/products.service';
import { Repository } from 'typeorm';
import { LoggerService } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { instance, mock } from 'ts-mockito';
import { Products } from '../entities/products.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import ProductExistsException from '../exceptions/product-exists.exeption';
import { products } from '../mocks/products';
import ProductNotFoundException from '../exceptions/product-not-found.exception';

describe('ProductService', () => {
    let service: ProductsService;
    let repository: Repository<Products>;
    let logger: LoggerService;

    beforeEach(async () => {
        const mockedRepository = mock<Repository<Products>>(Repository);
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ProductsService,
                {
                    provide: getRepositoryToken(Products),
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

        service = module.get<ProductsService>(ProductsService);
        repository = module.get<Repository<Products>>(getRepositoryToken(Products));
        logger = module.get<LoggerService>(WINSTON_MODULE_NEST_PROVIDER);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a Product', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        jest.spyOn(repository, 'create').mockReturnValue(products[0]);

        jest.spyOn(repository, 'save').mockResolvedValue(products[0]);

        const result = await service.createProduct(products[0]);

        expect(result).toEqual(products[0]);

        expect(repository.create).toHaveBeenCalledWith(expect.objectContaining(products[0]));

        expect(repository.save).toHaveBeenCalledWith(products[0]);
    });

    it('should throw an error if trying create exists product type', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(products[0]);

        await expect(service.createProduct(products[0])).rejects.toThrow(ProductExistsException);
    });

    it('should get a Product by type', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(products[0]);

        const result = await service.getProductByType(products[0].productType);

        expect(result).toEqual(products);
    });

    it('should throw an error if trying get not exists product type', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.getProductByType(products[0].productType)).rejects.toThrow(ProductNotFoundException);
    });

    it('should get all Products', async () => {
        jest.spyOn(repository, 'find').mockResolvedValue(products);

        const result = await service.getProducts();

        expect(Array.isArray(result)).toBe(true);

        expect(result).toEqual(products);
    });

    it('should throw an error if trying get not exists product type', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(null);

        await expect(service.getProductById(products[0].id)).rejects.toThrow(ProductNotFoundException);
    });

    it('should get a Product by id', async () => {
        jest.spyOn(repository, 'findOne').mockResolvedValue(products[0]);

        const result = await service.getProductById(products[0].id);

        expect(result).toEqual(products[0]);
    });
});
