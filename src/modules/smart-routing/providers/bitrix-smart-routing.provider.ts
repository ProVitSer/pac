import { Injectable } from '@nestjs/common';
import { GetRotingInfoProviderData, IncomingCallData, SmartRoutingProvider } from '../interfaces/smart-routing.interface';
import { CrmService } from '@app/modules/crm/services/crm.service';

@Injectable()
export class BitrixSmartRoutingProvider implements SmartRoutingProvider {
    constructor(private readonly crmService: CrmService) {}

    public async getRoutingInfo(data: IncomingCallData): Promise<GetRotingInfoProviderData> {
        const crmData = await this.crmService.searchClientByPhone(data.clientId, data.externalNumber);

        if (crmData.result.length == 0) return;

        const crmUser = await this.crmService.getPbxExtensionByCrmId(Number(crmData.result[0].ASSIGNED_BY_ID));

        if (!crmUser) return;

        return {
            firstname: crmData.result[0].NAME,
            extension: String(crmUser.pbxExtension),
        };
    }
}
