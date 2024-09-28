export enum CallDirection {
    incoming = 'incoming',
    outgoung = 'outgoung',
    local = 'local',
    unknown = 'unknown',
}

export enum CallProcess {
    callInProcess = 'callInProcess',
    callConnected = 'callConnected',
    callEnd = 'callEnd',
    callError = 'callError',
}
