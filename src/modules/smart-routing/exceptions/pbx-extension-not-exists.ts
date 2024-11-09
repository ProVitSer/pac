import { ConflictException } from '@nestjs/common';

export class PbxExtensionNotExists extends ConflictException {
    constructor(pbxExtension: string) {
        super(`Pbx Extension ${pbxExtension} Not Exists`);
    }
}
