export enum QueueServiceName {
    QueuePbxService = 'QueuePbxService',
}

export enum QueueServiceMethods {
    GetQueueList = 'GetQueueList',
    GetQueueAgents = 'GetQueueAgents',
    GetFreeQueueAgents = 'GetFreeQueueAgents',
    GetBusyQueueAgents = 'GetBusyQueueAgents',
    AddAgentsToQueue = 'AddAgentsToQueue',
    DeleteAgentsFromQueue = 'DeleteAgentsFromQueue',
}

export enum AgentQueueStatus {
    LoggedIn,
    LoggedOut,
}
