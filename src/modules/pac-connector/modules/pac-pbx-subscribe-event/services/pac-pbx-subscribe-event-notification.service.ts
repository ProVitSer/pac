/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { PacCallService } from '../../pac-call/services/pac-call.service';
import { PbxEvenetActiveConnectionsInfo, PbxEventActiveConnectionsInfo } from '../interfaces/pac-pbx-subscribe-event.interface';
import { PbxEventActiveConnectionsInfoAdapter } from '../adapters/pbx-event-active-connections-info.adapter';
import { ApiConnectionCallStatus } from '@app/modules/api/modules/call/interfaces/api-call.enum';
import { RequestWithPacInfo } from '@app/modules/pac-connector/interfaces/pac-connector.interface';
import { SmartRoutingProvidersService } from '@app/modules/smart-routing/services/smart-routing-providers.service';
import { AmqpService } from '@app/modules/amqp/services/amqp.service';
import { Exchange, RoutingKey } from '@app/common/constants/amqp';
import { ApiActiveConnectionsInfo, ConnectionsData } from '@app/modules/api/modules/call/interfaces/api-call.interface';
import { GetRotingInfoData } from '@app/modules/smart-routing/interfaces/smart-routing.interface';
import { MIN_EXTERNAL_NUMBER_LENGTH, MIN_TRUNK_UNIQUE_NUMBER_LENGTH } from '../pac-pbx-subscribe-event.config';

@Injectable()
export class PacPbxSubscribeEventNotificationService {
    private calls = new Map<string, PbxEventActiveConnectionsInfo>();
    constructor(
        private readonly pacCallService: PacCallService,
        private readonly amqpService: AmqpService,
        private readonly smartRoutingProvidersService: SmartRoutingProvidersService,
    ) {}

    public async insertEventProcess(request: RequestWithPacInfo, data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        const activeConnectionsInfo = this.getActiveConnectionsInfo(data);

        activeConnectionsInfo.map((a: ApiActiveConnectionsInfo) => {
            this.amqpService.sendMessage(Exchange.events, RoutingKey.callRinging, {
                clientId: request.client.clientId,
                connector: request.connector,
                callHistoryId: String(a.callId),
                activeConnectionsInfo,
            });
        });
    }

    public async updateEventProcess(request: RequestWithPacInfo, data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        const activeConnectionsInfo = this.getActiveConnectionsInfo(data);

        activeConnectionsInfo.map((a: ApiActiveConnectionsInfo) => {
            this.amqpService.sendMessage(Exchange.events, RoutingKey.callRinging, {
                clientId: request.client.clientId,
                connector: request.connector,
                callHistoryId: String(a.callId),
                activeConnectionsInfo,
            });
        });

        const filteredConnections = this.filterConnections(activeConnectionsInfo);

        if (filteredConnections.length) {
            const smartRouting = await this.getSmartRouting(request, filteredConnections[0]);

            if (smartRouting?.extension) {
                await this.transferCall(
                    request,
                    activeConnectionsInfo[0].callId,
                    filteredConnections[0].destinationNumber,
                    smartRouting?.extension,
                );
            }
        }
    }

    public async deleteEventProcess(request: RequestWithPacInfo, data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        return;
    }

    private getActiveConnectionsInfo(data: PbxEvenetActiveConnectionsInfo): ApiActiveConnectionsInfo[] {
        return new PbxEventActiveConnectionsInfoAdapter(data).activeConnectionsInfo;
    }

    private filterConnections(activeConnectionsInfo: ApiActiveConnectionsInfo[]): ConnectionsData[] {
        return activeConnectionsInfo
            .flatMap((call) => call.connectionsData)
            .filter(
                (connection) =>
                    connection.connectionCallStatus === ApiConnectionCallStatus.CallConnected &&
                    connection.isOutbound === true &&
                    connection.externalParty.length > MIN_EXTERNAL_NUMBER_LENGTH &&
                    connection.internalPartyNumber.length === MIN_TRUNK_UNIQUE_NUMBER_LENGTH,
            );
    }

    private async getSmartRouting(request: RequestWithPacInfo, connection: ConnectionsData): Promise<GetRotingInfoData> {
        return this.smartRoutingProvidersService.getRoutingInfo({
            clientId: request.client.clientId,
            pbxExtension: connection.destinationNumber,
            externalNumber: connection.externalParty,
        });
    }

    private async transferCall(request: RequestWithPacInfo, callId: number, destinationNumber: string, extension: string): Promise<void> {
        await this.pacCallService.transferCall(request.client.clientId, {
            callId,
            dn: destinationNumber,
            numberTo: extension,
        });
    }
}
