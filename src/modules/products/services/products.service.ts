import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Products } from '../entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import CreateProductDto from '../dto/create-product.dto';
import ProductExistsException from '../exceptions/product-exists.exeption';
import { ProductType } from '../interfaces/products.enum';
import ProductNotFoundException from '../exceptions/product-not-found.exception';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Products)
        private productRepository: Repository<Products>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async createProduct(productData: CreateProductDto): Promise<Products> {
        const product = await this.productRepository.findOne({
            where: [{ productType: productData.productType }],
        });

        if (product) {
            throw new ProductExistsException(productData.productType);
        }

        const newProduct = await this.productRepository.create({
            ...productData,
        });
        await this.productRepository.save(newProduct);
        return newProduct;
    }

    public async getProductByType(productType: ProductType): Promise<Products[]> {
        const product = await this.productRepository.findOne({
            where: {
                productType: productType,
            },
        });

        if (!product) {
            throw new ProductNotFoundException(productType);
        }

        return [product];
    }

    public async getProducts(): Promise<Products[]> {
        return await this.productRepository.find();
    }

    public async getProductById(productId: number): Promise<Products> {
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new ProductNotFoundException(productId);
        }

        return product;
    }

    public async deleteProduct(productId: number): Promise<void> {
        await this.getProductById(productId);

        await this.productRepository.delete(productId);
    }
}
