import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { RoutingServiceType } from '../interfaces/smart-routing.enum';
import { GetRotingInfoData, RotingInfoData, SmartRoutingProvider, SmartRoutingProviders } from '../interfaces/smart-routing.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { SmartRouting } from '../entities/smart-routing.entity';
import { BitrixSmartRoutingProvider } from '../providers/bitrix-smart-routing.provider';
import { CustomSmartRoutingProvider } from '../providers/custom-smart-routing.provider';
import { PhonebookSmartRoutingProvider } from '../providers/phonebook-smart-routing.provider';

@Injectable()
export class SmartRoutingService {
    constructor(
        @InjectRepository(SmartRouting)
        private smartRoutingRepository: Repository<SmartRouting>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly phonebook: PhonebookSmartRoutingProvider,
        private readonly custom: CustomSmartRoutingProvider,
        private readonly bitrix: BitrixSmartRoutingProvider,
    ) {}

    private get providers(): SmartRoutingProviders {
        return {
            [RoutingServiceType.bitrix]: this.bitrix,
            [RoutingServiceType.custom]: this.custom,
            [RoutingServiceType.phonebook]: this.phonebook,
        };
    }

    public async getRoutingInfo(data: RotingInfoData): Promise<GetRotingInfoData | void> {
        const smartRoutingInfo = await this.getSmartRoutingInfo(data);

        if (!smartRoutingInfo) return;

        const smartRoutingProvider = this.getRoutingProvider(smartRoutingInfo.routingService);

        return await smartRoutingProvider.getRoutingInfo({ externalNumber: data.externalNumber });
    }

    private getRoutingProvider(routingServiceType: RoutingServiceType): SmartRoutingProvider {
        return this.providers[routingServiceType];
    }

    private async getSmartRoutingInfo(data: RotingInfoData): Promise<SmartRouting> {
        const smartRoutingInfo = await this.smartRoutingRepository.findOne({
            where: { clientId: data.client.clientId, pbxExtension: data.pbxExtension },
        });

        return smartRoutingInfo;
    }
}
