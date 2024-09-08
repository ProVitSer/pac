import { Licenses } from '@app/modules/licenses/entities/licenses.entity';
import { ProductType } from './products.enum';

export interface ProductInterface {
    id: number;
    productType: ProductType;
    description?: string;
    licenses: Licenses[];
    createdAt: Date;
    updatedAt: Date;
}
