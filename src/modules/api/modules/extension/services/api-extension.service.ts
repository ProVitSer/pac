import { PacExtensionService } from '@app/modules/pac-connector/modules/pac-extension/services/pac-extension.service';
import { Injectable } from '@nestjs/common';
import {
    BaseExtensionResult,
    ExtensionInfo,
    ExtensionsList,
    ExtensionStatus,
    RegisteredExtensions,
} from '../interfaces/api-extension.interface';
import { ExtensionInfoAdapter } from '../adapters/extension-info.adapter';
import { ExtensionStatusReplyAdapter } from '../adapters/extension-status-reply.adapter';
import { GetExtensionDeviceInfoReply } from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.interface';
import CreateExtensionDto from '../dto/create-extension.dto';
import UpdateExtensionDto from '../dto/update-extension.dto';
import { UpdateExtensionAdapter } from '../adapters/update-extension.adapter';
import ExtensionForwardStatusDto from '../dto/extension-forward-status.dto';
import {
    ExtensionForwardStatus,
    ExtensionQueueStatus,
} from '@app/modules/pac-connector/modules/pac-extension/interfaces/pac-extension.enum';
import ExtensionGlobalQueueStatusDto from '../dto/extension-global-queue-status.dto';
import ExtensionQueueStatusDto from '../dto/extension-queue-status.dto';
import ExtensionCallForwardStatusDto from '../dto/extension-call-forward-status.dto';
import { ExtensionCallForwardStatusAdapter } from '../adapters/extension-call-forward-status.adapter';

@Injectable()
export class ApiExtensionService {
    constructor(private readonly pacExtensionService: PacExtensionService) {}

    public async getExtensionInfo(clientId: number, extension: string): Promise<ExtensionInfo> {
        const extensionInfo = await this.pacExtensionService.getExtensionInfo(clientId, { extension });

        return { ...new ExtensionInfoAdapter(extensionInfo).toPublicObject() };
    }

    public async getExtensionStatus(clientId: number, extension: string): Promise<ExtensionStatus> {
        const extensionStatus = await this.pacExtensionService.getExtensionStatus(clientId, { extension });

        return { ...new ExtensionStatusReplyAdapter(extensionStatus).toPublicObject() };
    }

    public async getExtensions(clientId: number): Promise<ExtensionsList> {
        return await this.pacExtensionService.getExtensions(clientId);
    }

    public async getRegisteredExtensions(clientId: number): Promise<RegisteredExtensions> {
        return await this.pacExtensionService.getRegisteredExtensions(clientId);
    }

    public async getExtensionDeviceInfo(clientId: number, extension: string): Promise<GetExtensionDeviceInfoReply> {
        return await this.pacExtensionService.getExtensionDeviceInfo(clientId, { extension });
    }

    public async createExtension(clientId: number, extension: CreateExtensionDto): Promise<ExtensionInfo> {
        await this.pacExtensionService.createExtension(clientId, extension);

        return this.getExtensionInfo(clientId, extension.extension);
    }

    public async deleteExtension(clientId: number, extension: string): Promise<BaseExtensionResult> {
        return await this.pacExtensionService.deleteExtension(clientId, { extension });
    }

    public async updateExtensionInfo(clientId: number, extension: UpdateExtensionDto): Promise<ExtensionInfo> {
        const extensionData = await this.getExtensionInfo(clientId, extension.extension);

        const updateData = new UpdateExtensionAdapter(extensionData, extension).toPublicObject();

        await this.pacExtensionService.updateExtensionInfo(clientId, updateData);

        return this.getExtensionInfo(clientId, extension.extension);
    }

    public async setExtensionForwardStatus(clientId: number, data: ExtensionForwardStatusDto): Promise<ExtensionStatus> {
        await this.pacExtensionService.setExtensionForwardStatus(clientId, {
            extension: data.extension,
            fwStatus: data.fwStatus as unknown as ExtensionForwardStatus,
        });

        return this.getExtensionStatus(clientId, data.extension);
    }

    public async setExtensionGlobalQueuesStatus(clientId: number, data: ExtensionGlobalQueueStatusDto): Promise<ExtensionStatus> {
        await this.pacExtensionService.setExtensionGlobalQueuesStatus(clientId, {
            extension: data.extension,
            status: data.status as unknown as ExtensionQueueStatus,
        });

        return this.getExtensionStatus(clientId, data.extension);
    }

    public async setExtensionStatusInQueue(clientId: number, data: ExtensionQueueStatusDto): Promise<ExtensionStatus> {
        await this.pacExtensionService.setExtensionStatusInQueue(clientId, {
            extension: data.extension,
            queueNumber: data.queueNumber,
            status: data.status as unknown as ExtensionQueueStatus,
        });

        return this.getExtensionStatus(clientId, data.extension);
    }

    public async setExtensionCallForwardStatus(clientId: number, data: ExtensionCallForwardStatusDto): Promise<ExtensionStatus> {
        const updateData = new ExtensionCallForwardStatusAdapter(data).toPublicObject();
        await this.pacExtensionService.setExtensionCallForwardStatus(clientId, updateData);

        return this.getExtensionStatus(clientId, data.extension);
    }
}
