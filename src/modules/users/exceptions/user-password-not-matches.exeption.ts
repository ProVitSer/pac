import { ConflictException } from '@nestjs/common';

export class UserPasswordNotMatchesException extends ConflictException {
    constructor() {
        super(`User password does not match`);
    }
}
