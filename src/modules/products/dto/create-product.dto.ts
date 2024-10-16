import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Products } from '../entities/products.entity';
import { ProductType } from '../interfaces/products.enum';

export class CreateProductDto implements Partial<Products> {
    @IsEnum(ProductType)
    productType: ProductType;

    @IsOptional()
    @IsString()
    description?: string;
}

export default CreateProductDto;
