export enum RoutingKey {
    sendMail = 'mail.sendMail',
    pbxCqa = 'pbx.cqa',
    callRinging = 'call.ringing',
    callConnected = 'call.connected',
    callEnd = 'call.end',
    callMissed = 'call.missed',
    callMissedTg = 'call.missed-tg',
    callMissedSms = 'call.missed-sms',
    callMissedCrm = 'call.missed-crm',
    incomingCallAnalitics = 'call.incoming',
    outboundCallAnalitics = 'call.outbound',
    localCallAnalitics = 'call.local',
    addCallToCrm = 'call.crm',
}

export enum Exchange {
    events = 'events',
}

export enum Queues {
    mail = 'mail',
    pbxCqaQueue = 'pbx-cqa-queue',
    calls = 'calls',
    callRinging = 'call-ringing',
    callConnected = 'call-connected',
    callEnd = 'call-end',
    callMissed = 'call-missed',
    callMissedTg = 'call-missed-tg',
    callMissedSms = 'call-missed-sms',
    callMissedCrm = 'call-missed-crm',
    callAnalitics = 'call-analitics',
    addCallCrm = 'add-call-crm',
}
