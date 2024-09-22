export enum ApiActiveCallsStatus {
    Dialing = 'Dialing',
    Ringing = 'Ringing',
    Talking = 'Talking',
    Other = 'Other',
    Finish = 'Finish',
}

export enum ApiCallDirection {
    Inbound = 'Inbound',
    Outbound = 'Outbound',
    Local = 'Local',
}

export enum ApiConnectionCallStatus {
    CallUndefined = 'CallUndefined',
    CallDialing = 'CallDialing',
    CallRinging = 'CallRinging',
    CallConnected = 'CallConnected',
    CallHold = 'CallHold',
    CallHeld = 'CallHeld',
}
