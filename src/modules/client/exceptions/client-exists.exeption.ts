import { NotFoundException } from '@nestjs/common';

class ClientExistsException extends NotFoundException {
    constructor(clientData: string) {
        super(`Client with ${clientData} exists`);
    }
}

export default ClientExistsException;
