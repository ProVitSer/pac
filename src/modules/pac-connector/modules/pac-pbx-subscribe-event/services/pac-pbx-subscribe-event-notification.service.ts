import { Injectable } from '@nestjs/common';
import { PacSqlService } from '../../pac-sql/services/pac-sql.service';
import { Request } from 'express';
import { UtilsService } from '@app/common/utils/utils.service';
import { ClientService } from '@app/modules/client/services/client.service';
import { PacConnectorService } from '@app/modules/pac-connector/services/pac-connector.service';
import { PacCallService } from '../../pac-call/services/pac-call.service';
import { PbxEvenetActiveConnectionsInfo } from '../interfaces/pac-pbx-subscribe-event.interface';
import { PbxEventActiveConnectionsInfoAdapter } from '../adapters/pbx-event-active-connections-info.adapter';
import { ApiConnectionCallStatus } from '@app/modules/api/modules/call/interfaces/api-call.enum';

@Injectable()
export class PacPbxSubscribeEventNotificationService {
    constructor(
        private readonly pacSqlService: PacSqlService,
        private readonly pacConnectorService: PacConnectorService,
        private readonly clientService: ClientService,
        private readonly pacCallService: PacCallService,
    ) {}

    public async eventProcess(request: Request, data: PbxEvenetActiveConnectionsInfo) {
        const ip = UtilsService.convertToIPv4(request.ip);

        const connector = await this.pacConnectorService.getPacConnectorByIp(ip);

        if (!connector) return;

        const client = await this.clientService.getClientById(connector.clientId);

        if (!client) return;

        const activeConnectionsInfo = new PbxEventActiveConnectionsInfoAdapter(data).activeConnectionsInfo;

        // TODO
        // Получение маршрутного номера и номера группы/очереди из модуля smart routing

        const call = activeConnectionsInfo[0].connectionsData.filter((d) => d.destinationNumber == '814');

        if (call[0].connectionCallStatus == ApiConnectionCallStatus.CallConnected) {
            const d = {
                callId: activeConnectionsInfo[0].callId,
                dn: '814',
                numberTo: '107',
            };

            await this.pacCallService.transferCall(client, d);
        }
    }
}
