export enum CallDirection {
    incoming = 'incoming',
    outgoing = 'outgoing',
    local = 'local',
    unknown = 'unknown',
}

export enum CallProcess {
    callInProcess = 'callInProcess',
    callConnected = 'callConnected',
    callEnd = 'callEnd',
    callError = 'callError',
}
