import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Product } from '../entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import CreateProductDto from '../dto/create-product.dto';
import ProductExistsException from '../exceptions/product-exists.exeption';
import { ProductType } from '../interfaces/product.enum';
import ProductNotFoundException from '../exceptions/product-not-found.exception';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
    ) {}

    public async createProduct(productData: CreateProductDto): Promise<Product> {
        const product = await this.productRepository.findOne({
            where: [{ product_type: productData.product_type }],
        });

        if (product) {
            throw new ProductExistsException(productData.product_type);
        }

        const newProduct = await this.productRepository.create({
            ...productData,
        });
        await this.productRepository.save(newProduct);

        return newProduct;
    }

    public async getProductByType(productType: ProductType): Promise<Product[]> {
        const product = await this.productRepository.findOne({
            where: {
                product_type: productType,
            },
        });

        if (!product) {
            throw new ProductNotFoundException(productType);
        }

        return [product];
    }

    public async getProducts(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    public async getProductById(productId: number): Promise<Product> {
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
