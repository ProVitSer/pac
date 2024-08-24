import { NotFoundException } from '@nestjs/common';

class ProductNotFoundException extends NotFoundException {
    constructor(product: any) {
        super(`Product ${product} not found`);
    }
}

export default ProductNotFoundException;
