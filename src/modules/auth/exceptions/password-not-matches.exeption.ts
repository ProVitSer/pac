import { UnauthorizedException } from '@nestjs/common';

export class PasswordNotMatchesException extends UnauthorizedException {
    constructor() {
        super(`Password does not match`);
    }
}
