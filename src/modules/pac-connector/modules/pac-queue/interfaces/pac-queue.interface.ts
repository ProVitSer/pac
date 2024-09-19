import { AgentQueueStatus } from './pac-queue.enum';

export interface QueueInfoRequest {
    queueNumber: string;
}

export interface QueueInfoReply {
    queueInfo: QueueInfo[];
}

export interface QueueInfo {
    extension: string;
    firstName: string;
    lastName: string;
    agentQueueStatus: AgentQueueStatus;
}

export interface QueueModifyRequest {
    queueNumber: string;
    agents: string[];
}

export interface QueueModifyReply {
    queueNumber: string;
    agents: string[];
}

export interface QueueListDataReply {
    queues: QueueListInfo[];
}

export interface QueueListInfo {
    name: string;
    number: string;
}
