import { Products } from '../entities/products.entity';
import { ProductType } from '../interfaces/products.enum';

export const products = [
    {
        id: 1,
        productType: ProductType.api,
        licenses: [1, 2],
    },
] as unknown as Products[];
