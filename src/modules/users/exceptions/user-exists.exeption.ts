import { ConflictException } from '@nestjs/common';

class UserExistsException extends ConflictException {
    constructor(email: string) {
        super(`User with this email ${email} exists`);
    }
}

export default UserExistsException;
