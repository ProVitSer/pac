import { PlainObject } from '@app/common/interfaces/interfaces';
import { UpdateExtensionDto } from '../dto/update-extension.dto';
import { ExtensionInfo } from '../interfaces/api-extension.interface';

export class UpdateExtensionAdapter {
    public extension: string;
    public firstName: PlainObject;
    public lastName: PlainObject;
    public email: PlainObject;
    public authId: PlainObject;
    public authPassword: PlainObject;
    public mobileNumber: PlainObject;
    public sipId: PlainObject;
    public outboundCallerId: PlainObject;
    public recordingType: PlainObject;
    public isExtensionEnabled: PlainObject;
    public disableExternalCalls: PlainObject;
    public deliverAudio: PlainObject;
    public supportReinvite: PlainObject;
    public supportReplaces: PlainObject;
    constructor(extensionData: ExtensionInfo, updateData: UpdateExtensionDto) {
        this.extension = updateData.extension;
        this.firstName = updateData.firstName ? { value: updateData.firstName } : { value: extensionData.firstName };
        this.lastName = updateData.lastName ? { value: updateData.lastName } : { value: extensionData.lastName };
        this.email = updateData.email ? { value: updateData.email } : { value: extensionData.email };
        this.authId = updateData.authId ? { value: updateData.authId } : { value: extensionData.authId };
        this.authPassword = updateData.authPassword ? { value: updateData.authPassword } : { value: extensionData.authPassword };
        this.mobileNumber = updateData.mobileNumber ? { value: updateData.mobileNumber } : { value: extensionData.mobileNumber };
        this.outboundCallerId = updateData.outboundCallerId
            ? { value: updateData.outboundCallerId }
            : { value: extensionData.outboundCallerId };
        this.recordingType = updateData.recordingType
            ? (updateData.recordingType as unknown as PlainObject)
            : (extensionData.recordingType as unknown as PlainObject);
        this.isExtensionEnabled = updateData.isExtensionEnabled
            ? { value: updateData.isExtensionEnabled }
            : { value: extensionData.isExtensionEnabled };
        this.disableExternalCalls = updateData.disableExternalCalls
            ? { value: updateData.disableExternalCalls }
            : { value: extensionData.disableExternalCalls };
        this.deliverAudio = updateData.deliverAudio ? { value: updateData.deliverAudio } : { value: extensionData.deliverAudio };
        this.supportReinvite = updateData.supportReinvite
            ? { value: updateData.supportReinvite }
            : { value: extensionData.supportReinvite };
        this.supportReplaces = updateData.supportReplaces
            ? { value: updateData.supportReplaces }
            : { value: extensionData.supportReplaces };
    }

    public toPublicObject() {
        return this;
    }
}
