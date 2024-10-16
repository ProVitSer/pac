import {
    ExtensionForwardStatus,
    ExtensionStateType,
    FwCallType,
    FwToType,
} from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.enum';
import {
    EXTENSION_API_FW_CALL_GRPC_FW_CALL,
    EXTENSION_API_FW_STATUS_GRPC_FW_STATUS,
    EXTENSION_API_FW_TO_GRPC_FW_TO,
    EXTENSION_API_STATE_GRPC_EXT_STATE,
} from '../api-extension.constants';
import ExtensionCallForwardStatusDto from '../dto/extension-call-forward-status.dto';

export class ExtensionCallForwardStatusAdapter {
    public extension: string;
    public fwStatus: ExtensionForwardStatus;
    public fwTo: FwToType;
    public fwCall: FwCallType;
    public extensionState?: ExtensionStateType;
    public number?: string;
    constructor(data: ExtensionCallForwardStatusDto) {
        this.extension = data.extension;
        this.fwStatus = EXTENSION_API_FW_STATUS_GRPC_FW_STATUS[data.fwStatus];
        this.fwTo = EXTENSION_API_FW_TO_GRPC_FW_TO[data.fwTo];
        this.fwCall = EXTENSION_API_FW_CALL_GRPC_FW_CALL[data.fwCall];
        data.extension ? (this.extensionState = EXTENSION_API_STATE_GRPC_EXT_STATE[data.extensionState]) : {};
        this.number = data.number;
    }

    public toPublicObject() {
        return this;
    }
}
