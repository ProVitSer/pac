import { Client } from '../../../modules/client/entities/client.entity';
import { Products } from '@app/modules/products/entities/products.entity';

export interface LicensesInterface {
    id: number;
    client: Client;
    products: Products[];
    expirationDate: Date;
    isActive: boolean;
    isTest: boolean;
    order?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ActiveLicenseResponse {
    isActive: boolean;
}
