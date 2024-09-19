import { AgentQueueStatus } from '@app/modules/pac-connector/modules/pac-queue/interfaces/pac-queue.enum';
import { ApiAgentQueueStatus } from './interfaces/api-queue.enum';

export const AGENT_QUEUE_STATUS_TO_API_STATUS: { [code in AgentQueueStatus]: ApiAgentQueueStatus } = {
    [AgentQueueStatus.LoggedIn]: ApiAgentQueueStatus.LoggedIn,
    [AgentQueueStatus.LoggedOut]: ApiAgentQueueStatus.LoggedOut,
};
