import { NotFoundException } from '@nestjs/common';
import { ProductType } from '../interfaces/products.enum';

class ProductExistsException extends NotFoundException {
    constructor(productType: ProductType) {
        super(`Product ${productType} exists`);
    }
}

export default ProductExistsException;
