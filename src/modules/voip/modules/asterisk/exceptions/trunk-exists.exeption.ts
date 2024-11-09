import { ConflictException } from '@nestjs/common';

class TrunkExistsException extends ConflictException {
    constructor(trunkId: string) {
        super(`Trunk ${trunkId} exists`);
    }
}

export default TrunkExistsException;
