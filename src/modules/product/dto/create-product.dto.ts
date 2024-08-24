import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';
import { ProductType } from '../interfaces/product.enum';

export class CreateProductDto implements Partial<Product> {
    @IsEnum(ProductType)
    product_type: ProductType;

    @IsOptional()
    @IsString()
    description?: string;
}

export default CreateProductDto;
