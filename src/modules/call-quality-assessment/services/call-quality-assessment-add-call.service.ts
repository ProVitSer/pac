import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { EndCallSubHandlerData, ExternalCdrData } from '../interfaces/call-quality-assessment.interface';
import { PacSqlService } from '@app/modules/pac-connector/modules/pac-sql/services/pac-sql.service';
import { CallQualityAssessmentStatisticService } from './call-quality-assessment-statistic.service';
import { ClientService } from '@app/modules/client/services/client.service';
import { ApiExtensionService } from '@app/modules/api/modules/extension/services/api-extension.service';
import { CQS_CDR_SQL } from '@app/common/constants/sql';
import { DadataApiService } from '@app/modules/dadata-api/services/dadata-api.service';
import { DaDataPhoneObj } from '@app/modules/dadata-api/interfaces/dadata-api.interface';
import { DadataTypes, SuggestionsStatus } from '@app/modules/dadata-api/interfaces/dadata-api.enum';
import AddCqasData from '../dto/add-cqas-data.dto';

@Injectable()
export class CallQualityAssessmentAddCallService {
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService,
        private readonly pacSqlService: PacSqlService,
        private readonly cqas: CallQualityAssessmentStatisticService,
        private readonly clientService: ClientService,
        private readonly apiExtensionService: ApiExtensionService,
        private readonly dadataApiService: DadataApiService,
    ) {}

    public async addCqaCallToStatistic(data: EndCallSubHandlerData): Promise<void> {
        const externalCdrData = await this.getExternalCdrCallData(
            data.cqac.clientId,
            data.event.channel.caller.number,
            data.event.channel.dialplan.exten,
        );

        if (!externalCdrData) return;

        const phosneData = await this.getPhoneData(externalCdrData.clientNumber);

        await this.cqas.updateStatistic({
            uniqueid: data.event.channel.id,
            externalCallId: externalCdrData.externalCallId,
            clientNumber: externalCdrData.clientNumber,
            managerData: externalCdrData.managerData,
            managerNumber: externalCdrData.managerNumber,
            region: phosneData.region || '',
            city: phosneData.city || '',
            country: phosneData.country || '',
        });
    }

    public async addCqasDataVox(clientId: number, data: AddCqasData): Promise<void> {
        const externalCdrData = await this.getExternalCdrCallData(clientId, data.number, data.exten);

        if (!externalCdrData) return;

        await this.cqas.addCqasStatistic({
            trunkId: '10004-1726243876',
            uniqueid: data.uniqueid,
            clientNumber: externalCdrData.clientNumber,
        });

        const phosneData = await this.getPhoneData(externalCdrData.clientNumber);

        await this.cqas.updateStatistic({
            uniqueid: data.uniqueid,
            externalCallId: externalCdrData.externalCallId,
            clientNumber: externalCdrData.clientNumber,
            managerData: externalCdrData.managerData,
            managerNumber: externalCdrData.managerNumber,
            region: phosneData.region || '',
            city: phosneData.city || '',
            country: phosneData.country || '',
            rating: Number(data.rating),
        });
    }

    private async getExternalCdrCallData(clientId: number, dnNumber: string, callerNumber: string): Promise<ExternalCdrData | undefined> {
        const client = await this.clientService.getClientById(clientId);

        const externalCdr = await this.pacSqlService.sqlRequest(client.clientId, {
            query: `${CQS_CDR_SQL} ai.dn = '${dnNumber}' AND ai.caller_number = '${callerNumber}' ORDER BY s.call_id DESC LIMIT 1;`,
        });

        if (!externalCdr.error) {
            const externalCdrData = JSON.parse(externalCdr.result);

            const extensionInfo = await this.apiExtensionService.getExtensionInfo(client.clientId, externalCdrData[0][1]);

            return {
                externalCallId: externalCdrData[0][0] || '',
                clientNumber: externalCdrData[0][2] || '',
                managerData: `${extensionInfo.firstName || ''} ${extensionInfo.lastName || ''}`,
                managerNumber: extensionInfo.extension || '',
            };
        }

        return;
    }

    private async getPhoneData(clientNumber: string): Promise<DaDataPhoneObj | undefined> {
        try {
            const dadataData = {
                type: DadataTypes.PHONE,
                suggestions: SuggestionsStatus.NO,
                query: clientNumber,
            };
            const phoneData = await this.dadataApiService.getDadataInfo<DaDataPhoneObj[]>(dadataData);

            return phoneData.length > 0 ? phoneData[0] : undefined;
        } catch (e) {
            this.logger.error(e);
            return;
        }
    }
}
