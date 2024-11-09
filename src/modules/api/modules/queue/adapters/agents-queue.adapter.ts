import { QueueInfo, QueueInfoReply } from '@app/modules/pac-connector/modules/pac-queue/interfaces/pac-queue.interface';
import { ApiAgentsQueueInfo } from '../interfaces/api-queue.interface';
import { AGENT_QUEUE_STATUS_TO_API_STATUS } from '../api-queue.constants';
import { ApiAgentQueueStatus } from '../interfaces/api-queue.enum';

export class AgentsQueueAdapter {
    public queueInfo: ApiAgentsQueueInfo[];
    constructor(data: QueueInfoReply) {
        this.queueInfo = data.queueInfo.map((q: QueueInfo) => {
            return {
                extension: q.extension,
                firstName: q.firstName,
                lastName: q.lastName,
                agentQueueStatus: q?.agentQueueStatus ? AGENT_QUEUE_STATUS_TO_API_STATUS[q.agentQueueStatus] : ApiAgentQueueStatus.LoggedIn,
            };
        });

        console.log(this.queueInfo);
    }
}
