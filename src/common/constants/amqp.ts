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
}

export enum Exchange {
    events = 'events',
}

export enum Queues {
    mail = 'mail',
    pbxCqaQueue = 'pbxCqaQueue',
    calls = 'calls',
    callRinging = 'callRinging',
    callConnected = 'callConnected',
    callEnd = 'callEnd',
    callMissed = 'callMissed',
    callMissedTg = 'callMissedTg',
    callMissedSms = 'callMissedSms',
    callMissedCrm = 'callMissedCrm',
}
