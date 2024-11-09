import { NotFoundException } from '@nestjs/common';

export class UserEmailNotFoundException extends NotFoundException {
    constructor(email: string) {
        super(`User with this email ${email} does not exist`);
    }
}
