import { NotFoundException } from '@nestjs/common';
import { ProductType } from '../interfaces/product.enum';

class ProductExistsException extends NotFoundException {
    constructor(productType: ProductType) {
        super(`Product ${productType} exists`);
    }
}

export default ProductExistsException;
