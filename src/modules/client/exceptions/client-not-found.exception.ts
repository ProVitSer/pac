import { NotFoundException } from '@nestjs/common';

class ClientNotFoundException extends NotFoundException {
    constructor(companyId: number) {
        super(`Company with id ${companyId} not found`);
    }
}

export default ClientNotFoundException;
