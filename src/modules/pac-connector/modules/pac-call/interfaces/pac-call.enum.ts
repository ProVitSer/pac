export enum CallServiceName {
    CallPbxService = 'CallPbxService',
}

export enum CallServiceMethods {
    GetActiveCallsInfo = 'GetActiveCallsInfo',
    GetCountCalls = 'GetCountCalls',
    MakeCall = 'MakeCall',
    HangupCall = 'HangupCall',
    TransferCall = 'TransferCall',
    GetActiveConnectionsInfo = 'GetActiveConnectionsInfo',
}

export enum ActiveCallsStatus {
    Dialing,
    Ringing,
    Talking,
    Other,
    Finish,
}

export enum CallDirection {
    Inbound,
    Outbound,
    Local,
}
