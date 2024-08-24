import { ConflictException } from '@nestjs/common';

class ClientExistsException extends ConflictException {
    constructor(clientData: string) {
        super(`Client with ${clientData} exists`);
    }
}

export default ClientExistsException;
