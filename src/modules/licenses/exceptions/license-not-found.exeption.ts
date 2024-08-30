import { NotFoundException } from '@nestjs/common';

class LicenseNotFoundException extends NotFoundException {
    constructor(license: string) {
        super(`License ${license}  doesn't exists`);
    }
}

export default LicenseNotFoundException;
