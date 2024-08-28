import { ConflictException } from '@nestjs/common';

export class PasswordNotMatchesException extends ConflictException {
    constructor() {
        super(`Password does not match`);
    }
}
