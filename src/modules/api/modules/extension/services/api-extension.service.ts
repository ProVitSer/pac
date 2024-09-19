import { Client } from '@app/modules/client/entities/client.entity';
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

@Injectable()
export class ApiExtensionService {
    constructor(private readonly pacExtensionService: PacExtensionService) {}

    public async getExtensionInfo(client: Client, extension: string): Promise<ExtensionInfo> {
        const extensionInfo = await this.pacExtensionService.getExtensionInfo(client, { extension });

        return { ...new ExtensionInfoAdapter(extensionInfo).toPublicObject() };
    }

    public async getExtensionStatus(client: Client, extension: string): Promise<ExtensionStatus> {
        const extensionStatus = await this.pacExtensionService.getExtensionStatus(client, { extension });

        return { ...new ExtensionStatusReplyAdapter(extensionStatus).toPublicObject() };
    }

    public async getExtensions(client: Client): Promise<ExtensionsList> {
        return await this.pacExtensionService.getExtensions(client);
    }

    public async getRegisteredExtensions(client: Client): Promise<RegisteredExtensions> {
        return await this.pacExtensionService.getRegisteredExtensions(client);
    }

    public async getExtensionDeviceInfo(client: Client, extension: string): Promise<GetExtensionDeviceInfoReply> {
        return await this.pacExtensionService.getExtensionDeviceInfo(client, { extension });
    }

    public async createExtension(client: Client, extension: CreateExtensionDto): Promise<ExtensionInfo> {
        await this.pacExtensionService.createExtension(client, extension);

        return this.getExtensionInfo(client, extension.extension);
    }

    public async deleteExtension(client: Client, extension: string): Promise<BaseExtensionResult> {
        return await this.pacExtensionService.deleteExtension(client, { extension });
    }

    public async updateExtensionInfo(client: Client, extension: UpdateExtensionDto): Promise<ExtensionInfo> {
        const extensionData = await this.getExtensionInfo(client, extension.extension);

        const updateData = new UpdateExtensionAdapter(extensionData, extension).toPublicObject();

        await this.pacExtensionService.updateExtensionInfo(client, updateData);

        return this.getExtensionInfo(client, extension.extension);
    }

    public async setExtensionForwardStatus(client: Client, data: ExtensionForwardStatusDto): Promise<ExtensionStatus> {
        await this.pacExtensionService.setExtensionForwardStatus(client, {
            extension: data.extension,
            fwStatus: data.fwStatus as unknown as ExtensionForwardStatus,
        });

        return this.getExtensionStatus(client, data.extension);
    }

    public async setExtensionGlobalQueuesStatus(client: Client, data: ExtensionGlobalQueueStatusDto): Promise<ExtensionStatus> {
        await this.pacExtensionService.setExtensionGlobalQueuesStatus(client, {
            extension: data.extension,
            status: data.status as unknown as ExtensionQueueStatus,
        });

        return this.getExtensionStatus(client, data.extension);
    }

    public async setExtensionStatusInQueue(client: Client, data: ExtensionQueueStatusDto): Promise<ExtensionStatus> {
        await this.pacExtensionService.setExtensionStatusInQueue(client, {
            extension: data.extension,
            queueNumber: data.queueNumber,
            status: data.status as unknown as ExtensionQueueStatus,
        });

        return this.getExtensionStatus(client, data.extension);
    }
}
