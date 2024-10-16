import { NotFoundException } from '@nestjs/common';

export class CqacTrunkNotFoundException extends NotFoundException {
    constructor() {
        super(`Trunk not found`);
    }
}
