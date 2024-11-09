import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { SmartRouting } from '../entities/smart-routing.entity';
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

    public async getPbxExtension(clientId: number): Promise<PbxExtensionList[]> {
        const pbxExtension = await this.pacIvrService.getIvrList(clientId);

        const data = await this.getFreePbxExtension(clientId, pbxExtension.ivrs);

        const filteredData = data.filter((item) => {
            const number = item.number;
            return /^\d+$/.test(number) && !number.startsWith('7');
        });

        return filteredData;
    }

    public async getSmartRouting(clientId: number): Promise<SmartRouting[]> {
        const smartRoutingInfo = await this.smartRoutingRepository.find({
            where: { clientId },
        });

        return smartRoutingInfo;
    }

    public async deleteSmartRoutingById(clientId: number, data: DeleteSmartRouting): Promise<void> {
        const smartRouting = await this.getSmartRouting(clientId);
        const ids = smartRouting.map((item) => item.id);

        if (ids.includes(data.id)) {
            await this.smartRoutingRepository.delete({ id: data.id });
        }
    }

    public async addSmartRouting(clientId: number, data: AddSmartRouting): Promise<void> {
        const pbxExtensions = await this.getPbxExtension(clientId);

        const existsNumber = pbxExtensions.map((item) => item.number);

        if (!existsNumber.includes(data.pbxExtension)) throw new PbxExtensionNotExists(data.pbxExtension);

        const smartRouting = this.smartRoutingRepository.create();

        smartRouting.name = data.name || '';

        smartRouting.pbxExtension = data.pbxExtension;

        smartRouting.routingService = data.routingService;

        smartRouting.clientId = clientId;

        smartRouting.aiRouting = data.aiRouting;

        smartRouting.defaultRoutingNumber = data.defaultRoutingNumber;

        await this.smartRoutingRepository.save(smartRouting);
    }

    public async updateSmartRouting(clientId: number, data: UpdateSmartRouting): Promise<SmartRouting[]> {
        const { id, ...updateData } = data;

        const smartRouting = await this.getSmartRouting(clientId);

        const pbxExtensions = await this.getPbxExtension(clientId);

        const existsNumber = pbxExtensions.map((item) => item.number);

        if (updateData?.pbxExtension && !existsNumber.includes(updateData?.pbxExtension)) return await this.getSmartRouting(clientId);

        if (smartRouting.some((s: SmartRouting) => s.id == id)) {
            await this.smartRoutingRepository.update({ id }, { ...updateData });
        }

        return await this.getSmartRouting(clientId);
    }

    private async getFreePbxExtension(clientId: number, data: PbxExtensionList[]): Promise<PbxExtensionList[]> {
        const smartRoutingInfo = await this.smartRoutingRepository.find({
            select: {
                pbxExtension: true,
            },
            where: { clientId },
        });

        const numbersToRemove = smartRoutingInfo.map((item) => item.pbxExtension);

        const filteredData = data.filter((item) => !numbersToRemove.includes(item.number));

        return filteredData;
    }
}
