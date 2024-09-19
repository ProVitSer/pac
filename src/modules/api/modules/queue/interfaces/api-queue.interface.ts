import { ApiAgentQueueStatus } from './api-queue.enum';

export interface QueueList {
    queues: QueueListInfo[];
}

export interface QueueListInfo {
    name: string;
    number: string;
}

export interface ApiAgentsQueue {
    queueInfo: ApiAgentsQueueInfo[];
}

export interface ApiAgentsQueueInfo {
    extension: string;
    firstName: string;
    lastName: string;
    agentQueueStatus: ApiAgentQueueStatus;
}
