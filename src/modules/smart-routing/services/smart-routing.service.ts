import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { SmartRouting } from '../entities/smart-routing.entity';
import { Client } from '@app/modules/client/entities/client.entity';
import { PacIvrService } from '@app/modules/pac-connector/modules/pac-ivr/services/pac-ivr.service';
import { PbxExtensionList } from '../interfaces/smart-routing.interface';
import DeleteSmartRouting from '../dto/delete-smart-routing.dto';
import AddSmartRouting from '../dto/add-smart-routing.dto';
import UpdateSmartRouting from '../dto/update-smart-routing.dto';
import { PbxExtensionNotExists } from '../exceptions/pbx-extension-not-exists';

@Injectable()
export class SmartRoutingService {
    constructor(
        @InjectRepository(SmartRouting)
        private smartRoutingRepository: Repository<SmartRouting>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly pacIvrService: PacIvrService,
    ) {}

    public async getPbxExtension(client: Client): Promise<PbxExtensionList[]> {
        const pbxExtension = await this.pacIvrService.getIvrList(client);

        return await this.getFreePbxExtension(client, pbxExtension.ivrs);
    }

    public async getSmartRouting(client: Client): Promise<SmartRouting[]> {
        const smartRoutingInfo = await this.smartRoutingRepository.find({
            where: { clientId: client.clientId },
        });

        return smartRoutingInfo;
    }

    public async deleteSmartRoutingById(client: Client, data: DeleteSmartRouting): Promise<void> {
        const smartRouting = await this.getSmartRouting(client);
        const ids = smartRouting.map((item) => item.id);

        if (ids.includes(data.id)) {
            await this.smartRoutingRepository.delete({ id: data.id });
        }
    }

    public async addSmartRouting(client: Client, data: AddSmartRouting): Promise<void> {
        const pbxExtensions = await this.getPbxExtension(client);

        const existsNumber = pbxExtensions.map((item) => item.number);

        if (!existsNumber.includes(data.pbxExtension)) throw new PbxExtensionNotExists(data.pbxExtension);

        const smartRouting = this.smartRoutingRepository.create();
        smartRouting.name = data.name || '';
        smartRouting.pbxExtension = data.pbxExtension;
        smartRouting.routingService = data.routingService;
        smartRouting.clientId = client.clientId;
        await this.smartRoutingRepository.save(smartRouting);
    }

    public async updateSmartRouting(client: Client, data: UpdateSmartRouting): Promise<SmartRouting[]> {
        const { id, ...updateData } = data;

        const smartRouting = await this.getSmartRouting(client);

        const pbxExtensions = await this.getPbxExtension(client);

        const existsNumber = pbxExtensions.map((item) => item.number);

        if (updateData?.pbxExtension && !existsNumber.includes(updateData?.pbxExtension)) return await this.getSmartRouting(client);

        if (smartRouting.some((s: SmartRouting) => s.id == id)) {
            await this.smartRoutingRepository.update({ id }, { ...updateData });
        }

        return await this.getSmartRouting(client);
    }

    private async getFreePbxExtension(client: Client, data: PbxExtensionList[]): Promise<PbxExtensionList[]> {
        const smartRoutingInfo = await this.smartRoutingRepository.find({
            select: {
                pbxExtension: true,
            },
            where: { clientId: client.clientId },
        });

        const numbersToRemove = smartRoutingInfo.map((item) => item.pbxExtension);

        const filteredData = data.filter((item) => !numbersToRemove.includes(item.number));

        return filteredData;
    }
}
