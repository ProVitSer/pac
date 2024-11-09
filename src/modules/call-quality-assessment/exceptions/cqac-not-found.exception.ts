import { NotFoundException } from '@nestjs/common';

class CqacNotFoundException extends NotFoundException {
    constructor() {
        super(`Cqa config not found`);
    }
}

export default CqacNotFoundException;
