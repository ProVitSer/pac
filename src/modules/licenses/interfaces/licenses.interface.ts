import { Client } from '../../../modules/client/entities/client.entity';
import { Product } from '@app/modules/product/entities/product.entity';

export interface LicensesInterface {
    id: number;
    client: Client;
    products: Product[];
    expiration_date: Date;
    is_active: boolean;
    is_test: boolean;
    order?: Date;
    created_at: Date;
    updated_at: Date;
}

export interface ActiveLicenseResponse {
    is_active: boolean;
}
