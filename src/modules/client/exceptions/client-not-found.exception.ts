import { NotFoundException } from '@nestjs/common';

class ClientNotFoundException extends NotFoundException {
    constructor(client: number) {
        super(`Client with id ${client} not found`);
    }
}

export default ClientNotFoundException;
