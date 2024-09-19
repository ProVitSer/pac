import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EndCallSubHandlerData } from '../interfaces/call-quality-assessment.interface';
import { CdrService } from '@app/modules/cdr/services/cdr.service';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { CallQualityAssessmentStatisticService } from './call-quality-assessment-statistic.service';
import { ClientService } from '@app/modules/client/services/client.service';
import { ApiExtensionService } from '@app/modules/api/modules/extension/services/api-extension.service';

@Injectable()
export class CallQualityAssessmentAddCallService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly pacSqlService: PacSqlService,
        private readonly cdrService: CdrService,
        private readonly cqas: CallQualityAssessmentStatisticService,
        private readonly clientService: ClientService,
        private readonly apiExtensionService: ApiExtensionService,
    ) {}

    public async addCqaCallToStatistic(data: EndCallSubHandlerData): Promise<void> {
        const cdr = await this.cdrService.getCdrByUniq(data.event.channel.id);

        const client = await this.clientService.getClientById(data.cqac.clientId);

        const externalCdr = await this.pacSqlService.sqlRequest(client, {
            query: "SELECT s.call_id, di.caller_number FROM cl_segments s JOIN cl_participants sp ON sp.id = s.src_part_id JOIN cl_participants dp ON dp.id = s.dst_part_id JOIN cl_party_info si ON si.id = sp.info_id JOIN cl_party_info di ON di.id = dp.info_id LEFT JOIN cl_participants ap ON ap.id = s.action_party_id LEFT JOIN cl_party_info ai ON ai.id = ap.info_id WHERE ai.dn = '10004' AND si.did_number = '74991136033' AND ai.caller_number = '461'ORDER BY s.call_id DESC LIMIT 1;",
        });

        if (!externalCdr.error) {
            const externalCdrData = JSON.parse(externalCdr.result);

            const extensionInfo = await this.apiExtensionService.getExtensionInfo(client, externalCdrData[0][1]);

            await this.cqas.updateStatistic({
                uniqueid: data.event.channel.id,
                externalCallId: externalCdrData[0][0],
                managerData: `${extensionInfo.firstName || ''} ${extensionInfo.lastName || ''}`,
                managerNumber: extensionInfo.extension,
            });
        }
    }
}
