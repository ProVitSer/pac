/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PacCallService } from '../../pac-call/services/pac-call.service';
import { PbxEvenetActiveConnectionsInfo } from '../interfaces/pac-pbx-subscribe-event.interface';
import { PbxEventActiveConnectionsInfoAdapter } from '../adapters/pbx-event-active-connections-info.adapter';
import { ApiConnectionCallStatus } from '@app/modules/api/modules/call/interfaces/api-call.enum';
import { RequestWithPacInfo } from '@app/modules/pac-connector/interfaces/pac-connector.interface';

@Injectable()
export class PacPbxSubscribeEventNotificationService {
    constructor(private readonly pacCallService: PacCallService) {}

    public async insertEventProcess(request: RequestWithPacInfo, data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        const activeConnectionsInfo = new PbxEventActiveConnectionsInfoAdapter(data).activeConnectionsInfo;
    }

    public async updateEventProcess(request: RequestWithPacInfo, data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        const activeConnectionsInfo = new PbxEventActiveConnectionsInfoAdapter(data).activeConnectionsInfo;
    }
    public async deleteEventProcess(request: RequestWithPacInfo, data: PbxEvenetActiveConnectionsInfo): Promise<void> {
        const activeConnectionsInfo = new PbxEventActiveConnectionsInfoAdapter(data).activeConnectionsInfo;
    }
}
