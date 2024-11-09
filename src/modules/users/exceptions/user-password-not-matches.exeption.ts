import { ConflictException } from '@nestjs/common';

export class UserPasswordNotMatchesException extends ConflictException {
    constructor() {
        super(`Пароль пользователя не совпадает`);
    }
}
