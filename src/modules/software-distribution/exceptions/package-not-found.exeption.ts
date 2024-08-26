import { NotFoundException } from '@nestjs/common';

class PackageNotFoundException extends NotFoundException {
    constructor() {
        super(`The requested file was not found`);
    }
}

export default PackageNotFoundException;
