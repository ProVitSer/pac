import { Device, ExtensionStatusReply } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.interface';
import { ApiExtensionForwardStatus, ApiExtensionQueueStatus } from '../interfaces/api-extension.enum';
import { EXTENSION_FW_TO_API_FW, EXTENSION_QUEUE_STATUS_TO_API_QUEUE_STATUS } from '../api-extension.constants';

export class ExtensionStatusReplyAdapter {
    public firstName: string;
    public lastName: string;
    public email: string;
    public extension: string;
    public registered: string;
    public forwardingRulesStatus: ApiExtensionForwardStatus;
    public queuesStatus: ApiExtensionQueueStatus;
    public groups: string[];
    public inRingGroups: string[];
    public loggedInQueues: string[];
    public devices: Device[];
    constructor(private readonly data: ExtensionStatusReply) {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.extension = data.extension;
        this.registered = data.registered;
        this.forwardingRulesStatus = EXTENSION_FW_TO_API_FW[data.forwardingRulesStatus];
        this.queuesStatus = EXTENSION_QUEUE_STATUS_TO_API_QUEUE_STATUS[data.queuesStatus];
        this.groups = data.groups;
        this.inRingGroups = data.inRingGroups;
        this.loggedInQueues = data.loggedInQueues;
        this.devices = data.devices;
    }

    public toPublicObject() {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data, ...publicProps } = this;
        return publicProps;
    }
}
