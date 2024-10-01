import { PacQueueService } from '@app/modules/pac-connector/modules/pac-queue/services/pac-queue.service';
import { Injectable } from '@nestjs/common';
import { ApiAgentsQueue, QueueList } from '../interfaces/api-queue.interface';
import { AgentsQueueAdapter } from '../adapters/agents-queue.adapter';
import ModifyQueueDto from '../dto/modify-queue.dto';
import { QueueModifyReply } from '@app/modules/pac-connector/modules/pac-queue/interfaces/pac-queue.interface';

@Injectable()
export class ApiQueueService {
    constructor(private readonly pacQueueService: PacQueueService) {}

    public async getQueueList(clientId: number): Promise<QueueList> {
        const queueList = await this.pacQueueService.getQueueList(clientId);

        if (!queueList?.queues) return { queues: [] };

        return queueList;
    }

    public async getQueueAgents(clientId: number, queueNumber: string): Promise<ApiAgentsQueue> {
        const queueList = await this.pacQueueService.getQueueAgents(clientId, { queueNumber });

        if (!queueList?.queueInfo) return { queueInfo: [] };

        return { queueInfo: new AgentsQueueAdapter(queueList).queueInfo };
    }

    public async getFreeQueueAgents(clientId: number, queueNumber: string): Promise<ApiAgentsQueue> {
        const queueList = await this.pacQueueService.getFreeQueueAgents(clientId, { queueNumber });

        if (!queueList?.queueInfo) return { queueInfo: [] };

        return { queueInfo: new AgentsQueueAdapter(queueList).queueInfo };
    }

    public async getBusyQueueAgents(clientId: number, queueNumber: string): Promise<ApiAgentsQueue> {
        const queueList = await this.pacQueueService.getBusyQueueAgents(clientId, { queueNumber });

        if (!queueList?.queueInfo) return { queueInfo: [] };

        return { queueInfo: new AgentsQueueAdapter(queueList).queueInfo };
    }

    public async addAgentsToQueue(clientId: number, data: ModifyQueueDto): Promise<QueueModifyReply> {
        const queue = await this.pacQueueService.addAgentsToQueue(clientId, data);

        if (!queue.agents) return { queueNumber: queue.queueNumber, agents: [] };

        return queue;
    }

    public async deleteAgentsFromQueue(clientId: number, data: ModifyQueueDto): Promise<QueueModifyReply> {
        const queue = await this.pacQueueService.deleteAgentsFromQueue(clientId, data);

        if (!queue.agents) return { queueNumber: queue.queueNumber, agents: [] };

        return queue;
    }
}
