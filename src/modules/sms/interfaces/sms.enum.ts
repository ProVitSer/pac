export enum SmsSendStatus {
    apiFail = 'apiFail',
    error = 'error',
    inProgress = 'inProgress',
    completed = 'completed',
    cancel = 'cancel',
}

export enum SmscApiUrl {
    send = 'https://smsc.ru/rest/send/',
    status = 'https://smsc.ru/sys/status.php',
    balance = 'https://smsc.ru/sys/balance.php',
}

export enum SmscTranslit {
    translit = 1,
    mpaHc = 2,
}

export enum Tinyurl {
    default = 0,
    reduce = 1,
}

export enum ResponseFormat {
    string = 0,
    number = 1,
    xml = 2,
    json = 3,
}

export enum SmscStatus {
    SmsNotFound = -3,
    Stop = -2,
    WaitingSent = -1,
    PassedOperator = 0,
    SuccessfullySent = 1,
    MessageRead = 2,
    Overdue = 3,
    ClickLink = 4,
    UnableDeliver = 20,
    IncorrectPhone = 22,
    Forbidden = 23,
    InsufficientFunds = 24,
    UnavailableNumber = 25,
}

export enum SmscErrorCode {
    ErrorInParameters = 1,
    IncorrectLoginOrPass = 2,
    InsufficientFunds = 3,
    IpBlock = 4,
    DateFormatError = 5,
    MessageForbidden = 6,
    IncorrectPhone = 7,
    CannotBeDelivered = 8,
    DuplicateError = 9,
}

export enum Alltype {
    simpleInfo = 0, //default
    fullInfo = 1,
    addInfo = 2,
}
export enum CharsetType {
    win11251 = 'windows-1251', //default
    utf = 'utf-8',
    koi8 = 'koi8-r',
}

export enum DelSms {
    yes = 1,
}

export enum AddType {
    add = 1,
}
