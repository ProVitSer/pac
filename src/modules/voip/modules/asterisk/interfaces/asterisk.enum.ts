export enum Method {
    default = 'default',
    unspecified = 'unspecified',
    tlsv1 = 'tlsv1',
    tlsv1_1 = 'tlsv1_1',
    tlsv1_2 = 'tlsv1_2',
    tlsv1_3 = 'tlsv1_3',
    sslv2 = 'sslv2',
    sslv23 = 'sslv23',
    sslv3 = 'sslv3',
}

export enum Protokol {
    udp = 'udp',
    tcp = 'tcp',
    tls = 'tls',
    ws = 'ws',
    wss = 'wss',
    flow = 'flow',
}

export enum DefaultYesNoAsterisk {
    null = '0',
    one = '1',
    off = 'off',
    on = 'on',
    false = 'false',
    true = 'true',
    no = 'no',
    yes = 'yes',
}

export enum AuthType {
    md5 = 'md5',
    userpass = 'userpass',
    google_oauth = 'google_oauth',
}

export enum SecurityNegotiation {
    no = 'no',
    mediasec = 'mediasec',
}

export enum ConnectedLineMethod {
    invite = 'invite',
    reinvite = 'reinvite',
    update = 'update',
}

export enum DirectMediaMethod {
    invite = 'invite',
    reinvite = 'reinvite',
    update = 'update',
}

export enum DirectMediaGlareMitigation {
    none = 'none',
    outgoing = 'outgoing',
    incoming = 'incoming',
}

export enum DtmfMode {
    rfc4733 = 'rfc4733',
    inband = 'inband',
    info = 'info',
    auto = 'auto',
    auto_info = 'auto_info',
}

export enum Timers {
    forced = 'forced',
    no = 'no',
    required = 'required',
    yes = 'yes',
}

export enum CalleridPrivacy {
    allowed_not_screened = 'allowed_not_screened',
    allowed_passed_screened = 'allowed_passed_screened',
    allowed_failed_screened = 'allowed_failed_screened',
    allowed = 'allowed',
    prohib_not_screened = 'prohib_not_screened',
    prohib_passed_screened = 'prohib_passed_screened',
    prohib_failed_screened = 'prohib_failed_screened',
    prohib = 'prohib',
    unavailable = 'unavailable',
}

export enum MediaEncryption {
    no = 'no',
    sdes = 'sdes',
    dtls = 'dtls',
}

export enum T38UdptlEc {
    none = 'none',
    fec = 'fec',
    redundancy = 'redundancy',
}

export enum DtlsSetup {
    active = 'active',
    passive = 'passive',
    actpass = 'actpass',
}

export enum RedirectMethod {
    user = 'user',
    uri_core = 'uri_core',
    uri_pjsip = 'uri_pjsip',
}

export enum DtlsFingerprint {
    SHA1 = 'SHA-1',
    SHA256 = 'SHA-256',
}

export enum IncomingCallOfferPref {
    local = 'local',
    local_first = 'local_first',
    remote = 'remote',
    remote_first = 'remote_first',
}

export enum OutgoingCallOfferPref {
    local = 'local',
    local_merge = 'local_merge',
    local_first = 'local_first',
    remote = 'remote',
    remote_merge = 'remote_merge',
    remote_first = 'remote_first',
}

export enum AsteriskContext {
    client_trunk = 'client-trunk',
}

export enum ChannelType {
    PJSIP = 'PJSIP',
    SIP = 'SIP',
    LOCAL = 'local',
}

export enum PjsipTransport {
    udp = 'transport-udp',
    tcp = 'transport-tcp',
}
