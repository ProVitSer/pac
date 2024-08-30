import { ConflictException } from '@nestjs/common';

class LicenseExistsException extends ConflictException {
    constructor(clientId: number) {
        super(`License for ${clientId} exists`);
    }
}

export default LicenseExistsException;
