import { Injectable } from '@nestjs/common';
import { GetRotingInfoProviderData, IncomingCallData, SmartRoutingProvider } from '../interfaces/smart-routing.interface';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { SqlResponse } from '@app/modules/pac-connector/modules/pac-sql/interfaces/pac-sql.interface';
import { PHONEBOOK_SQL } from '@app/common/constants/sql';

@Injectable()
export class PhonebookSmartRoutingProvider implements SmartRoutingProvider {
    constructor(private readonly pacSqlService: PacSqlService) {}

    public async getRoutingInfo(data: IncomingCallData): Promise<GetRotingInfoProviderData> {
        const searchResult = await this.searchPhoneNumber(data);

        const parseResult = JSON.parse(searchResult.result);

        if (parseResult?.length == 0) return;

        if (parseResult[0][0]) {
            return {
                firstname: parseResult[0][0],
                extension: parseResult[0][1],
            };
        }

        return;
    }

    private async searchPhoneNumber(data: IncomingCallData): Promise<SqlResponse> {
        const phone = data.externalNumber.replace(/\D/g, '').slice(-9);

        const sql = `${PHONEBOOK_SQL} like '%${phone}' or pv_an1 like '%${phone}' or pv_an0 like '%${phone}' or pv_an3 like '%${phone}' or pv_an4 like '%${phone}'`;

        return this.pacSqlService.sqlRequest(data.clientId, { query: sql });
    }
}
