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
import { RedisService } from '@app/modules/redis/services/redis.service';

@Injectable()
export class SmartRoutingProvidersService {
    constructor(
        @InjectRepository(SmartRouting)
        private smartRoutingRepository: Repository<SmartRouting>,
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly phonebook: PhonebookSmartRoutingProvider,
        private readonly custom: CustomSmartRoutingProvider,
        private readonly bitrix: BitrixSmartRoutingProvider,
        private readonly redisService: RedisService,
    ) {}

    private get providers(): SmartRoutingProviders {
        return {
            [RoutingServiceType.bitrix]: this.bitrix,
            [RoutingServiceType.custom]: this.custom,
            [RoutingServiceType.phonebook]: this.phonebook,
            [RoutingServiceType.amocrm]: this.custom,
            [RoutingServiceType.alfacrm]: this.custom,
            [RoutingServiceType.customcrm]: this.custom,
        };
    }

    public async getRoutingInfo(data: RotingInfoData): Promise<GetRotingInfoData | undefined> {
        const smartRoutingInfo = await this.getSmartRoutingInfo(data);

        if (!smartRoutingInfo) return;

        const smartRoutingProvider = this.getRoutingProvider(smartRoutingInfo.routingService);

        const providerRoutingResult = await smartRoutingProvider.getRoutingInfo({
            clientId: data.clientId,
            externalNumber: data.externalNumber,
        });

        if (!providerRoutingResult) return;

        return {
            ...providerRoutingResult,
            aiRouting: smartRoutingInfo.aiRouting,
            defaultRoutingNumber: smartRoutingInfo.defaultRoutingNumber,
        };
    }

    private getRoutingProvider(routingServiceType: RoutingServiceType): SmartRoutingProvider {
        return this.providers[routingServiceType];
    }

    private async getSmartRoutingInfo(data: RotingInfoData): Promise<SmartRouting> {
        const smartRoutingInfo = await this.smartRoutingRepository.findOne({
            where: { clientId: data.clientId, pbxExtension: data.pbxExtension },
        });

        return smartRoutingInfo;
    }

    public async voxGetRoutingInfo(clientId: number, externalNumber: string): Promise<GetRotingInfoData | undefined> {
        const routingData = await this.redisService.hget(`externalNumber:${externalNumber}`, 'routingData');

        if (!routingData) return;

        const parseRoutingData = JSON.parse(routingData);

        const result = await this.getRoutingInfo({
            clientId,
            pbxExtension: parseRoutingData.pbxExtension,
            externalNumber,
        });

        return result;
    }
}
