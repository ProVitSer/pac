export enum RoutingKey {
    sendMail = 'mail.sendMail',
    pbxCqa = 'pbx.cqa',
    callRinging = 'call.ringing',
    callConnected = 'call.connected',
    callEnd = 'call.end',
}

export enum Exchange {
    events = 'events',
}

export enum Queues {
    mail = 'mail',
    pbxCqaQueue = 'pbxCqaQueue',
    calls = 'calls',
}
