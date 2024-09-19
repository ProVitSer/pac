import { Client } from '@app/modules/client/entities/client.entity';
import { PacQueueService } from '@app/modules/pac-connector/modules/pac-queue/services/pac-queue.service';
import { Injectable } from '@nestjs/common';
import { ApiAgentsQueue, QueueList } from '../interfaces/api-queue.interface';
import { AgentsQueueAdapter } from '../adapters/agents-queue.adapter';
import ModifyQueueDto from '../dto/modify-queue.dto';
import { QueueModifyReply } from '@app/modules/pac-connector/modules/pac-queue/interfaces/pac-queue.interface';

@Injectable()
export class ApiQueueService {
    constructor(private readonly pacQueueService: PacQueueService) {}

    public async getQueueList(client: Client): Promise<QueueList> {
        const queueList = await this.pacQueueService.getQueueList(client);

        if (!queueList?.queues) return { queues: [] };

        return queueList;
    }

    public async getQueueAgents(client: Client, queueNumber: string): Promise<ApiAgentsQueue> {
        const queueList = await this.pacQueueService.getQueueAgents(client, { queueNumber });

        if (!queueList?.queueInfo) return { queueInfo: [] };

        return { queueInfo: new AgentsQueueAdapter(queueList).queueInfo };
    }

    public async getFreeQueueAgents(client: Client, queueNumber: string): Promise<ApiAgentsQueue> {
        const queueList = await this.pacQueueService.getFreeQueueAgents(client, { queueNumber });

        if (!queueList?.queueInfo) return { queueInfo: [] };

        return { queueInfo: new AgentsQueueAdapter(queueList).queueInfo };
    }

    public async getBusyQueueAgents(client: Client, queueNumber: string): Promise<ApiAgentsQueue> {
        const queueList = await this.pacQueueService.getBusyQueueAgents(client, { queueNumber });

        if (!queueList?.queueInfo) return { queueInfo: [] };

        return { queueInfo: new AgentsQueueAdapter(queueList).queueInfo };
    }

    public async addAgentsToQueue(client: Client, data: ModifyQueueDto): Promise<QueueModifyReply> {
        const queue = await this.pacQueueService.addAgentsToQueue(client, data);

        if (!queue.agents) return { queueNumber: queue.queueNumber, agents: [] };

        return queue;
    }

    public async deleteAgentsFromQueue(client: Client, data: ModifyQueueDto): Promise<QueueModifyReply> {
        const queue = await this.pacQueueService.deleteAgentsFromQueue(client, data);

        if (!queue.agents) return { queueNumber: queue.queueNumber, agents: [] };

        return queue;
    }
}
