import { Licenses } from '@app/modules/licenses/entities/licenses.entity';
import { ProductType } from './product.enum';

export interface ProductInterface {
    id: number;
    product_type: ProductType;
    description?: string;
    licenses: Licenses[];
    created_at: Date;
    updated_at: Date;
}
