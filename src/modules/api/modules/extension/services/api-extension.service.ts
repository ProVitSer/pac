import { Client } from '@app/modules/client/entities/client.entity';
import { PacExtensionService } from '@app/modules/pac-connector/modules/pac-extension/services/pac-extension.service';
import { Injectable } from '@nestjs/common';
import { ExtensionInfo } from '../interfaces/api-extension.interface';
import { ExtensionInfoAdapter } from '../adapters/extension-info.adapter';

@Injectable()
export class ApiExtensionService {
    constructor(private readonly pacExtensionService: PacExtensionService) {}

    public async getExtensionInfo(client: Client, extension: string): Promise<ExtensionInfo> {
        const extensionInfo = await this.pacExtensionService.getExtensionInfo(client, { extension });

        return { ...new ExtensionInfoAdapter(extensionInfo).toPublicObject() };
    }
}
