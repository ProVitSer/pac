import { NotFoundException } from '@nestjs/common';

class CqacNotFoundException extends NotFoundException {
    constructor() {
        super(`Cqqac config not found`);
    }
}

export default CqacNotFoundException;
