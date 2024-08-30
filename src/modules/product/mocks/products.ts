import { Product } from '../entities/product.entity';
import { ProductType } from '../interfaces/product.enum';

export const products = [
    {
        id: 1,
        product_type: ProductType.api,
        licenses: [1, 2],
    },
] as unknown as Product[];
