import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(user: any) {
        super(`User ${user} usernot found`);
    }
}
