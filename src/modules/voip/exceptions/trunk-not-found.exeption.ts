import { NotFoundException } from '@nestjs/common';

export class TrunkNotFoundException extends NotFoundException {
    constructor() {
        super(`Trunk not found`);
    }
}
