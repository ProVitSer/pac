export enum RoutingKey {
    sendMail = 'mail.sendMail',
    pbxCqa = 'pbx.cqa',
    callRinging = 'call.ringing',
    callConnected = 'pbx.connected',
    callEnd = 'pbx.end',
}

export enum Exchange {
    events = 'events',
}

export enum Queues {
    mail = 'mail',
    pbxCqaQueue = 'pbxCqaQueue',
    calls = 'calls',
}
