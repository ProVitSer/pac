import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import {
    CalleridPrivacy,
    ConnectedLineMethod,
    DefaultYesNoAsterisk,
    DirectMediaGlareMitigation,
    DirectMediaMethod,
    DtlsFingerprint,
    DtlsSetup,
    DtmfMode,
    IncomingCallOfferPref,
    MediaEncryption,
    OutgoingCallOfferPref,
    RedirectMethod,
    SecurityNegotiation,
    T38UdptlEc,
    Timers,
} from '../interfaces/asterisk.enum';

@Entity('ps_endpoints')
export class PsEndpoints {
    @PrimaryColumn()
    id: string;

    @Column({ nullable: true })
    transport: string | null;

    @Column({ nullable: true })
    aors: string | null;

    @Column({ nullable: true })
    auth: string | null;

    @Column({ nullable: true })
    context: string | null;

    @Column({ nullable: true })
    disallow: string | null;

    @Column({ nullable: true })
    allow: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'direct_media',
    })
    directMedia: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: ConnectedLineMethod,
        nullable: true,
        name: 'connected_line_method',
    })
    connectedLineMethod: ConnectedLineMethod | null;

    @Column({
        type: 'enum',
        enum: DirectMediaMethod,
        nullable: true,
        name: 'direct_media_method',
    })
    directMediaMethod: DirectMediaMethod | null;

    @Column({
        type: 'enum',
        enum: DirectMediaGlareMitigation,
        nullable: true,
        name: 'direct_media_glare_mitigation',
    })
    directMediaGlareMitigation: DirectMediaGlareMitigation | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'disable_direct_media_on_nat',
    })
    disableDirectMediaOnNat: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DtmfMode,
        nullable: true,
        name: 'dtmf_mode',
    })
    dtmfMode: DtmfMode | null;

    @Column({ nullable: true, name: 'external_media_address' })
    externalMediaAddress: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'force_rport',
    })
    forceRport: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'ice_support',
    })
    iceSupport: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'identify_by' })
    identifyBy: string | null;

    @Column({ nullable: true })
    mailboxes: string | null;

    @Column({ nullable: true, name: 'moh_suggest' })
    mohSuggest: string | null;

    @Column({ nullable: true, name: 'outbound_auth' })
    outboundAuth: string | null;

    @Column({ nullable: true, name: 'outbound_proxy' })
    outboundProxy: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'rewrite_contact',
    })
    rewriteContact: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'rtp_ipv6',
    })
    rtpIpv6: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'rtp_symmetric',
    })
    rtpSymmetric: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'send_diversion',
    })
    sendDiversion: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'send_pai',
    })
    sendPai: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'send_rpid',
    })
    sendRpid: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'timers_min_se' })
    timersMinSe: number | null;

    @Column({
        type: 'enum',
        enum: Timers,
        nullable: true,
    })
    timers: Timers | null;

    @Column({ nullable: true, name: 'timers_sess_expires' })
    timersSessExpires: number | null;

    @Column({ nullable: true })
    callerid: string | null;

    @Column({
        type: 'enum',
        enum: CalleridPrivacy,
        nullable: true,
        name: 'callerid_privacy',
    })
    calleridPrivacy: CalleridPrivacy | null;

    @Column({ nullable: true, name: 'callerid_tag' })
    calleridTag: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'aggregate_mwi',
    })
    aggregateMwi: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'trust_id_inbound',
    })
    trustIdInbound: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'trust_id_outbound',
    })
    trustIdOutbound: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'use_ptime',
    })
    usePtime: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'use_avpf',
    })
    useAvpf: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: MediaEncryption,
        nullable: true,
        name: 'media_encryption',
    })
    mediaEncryption: MediaEncryption | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'inband_progress',
    })
    inbandProgress: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'call_group' })
    callGroup: string | null;

    @Column({ nullable: true, name: 'pickup_group' })
    pickupGroup: string | null;

    @Column({ nullable: true, name: 'named_call_group' })
    namedCallGroup: string | null;

    @Column({ nullable: true, name: 'named_pickup_group' })
    namedPickupGroup: string | null;

    @Column({ nullable: true, name: 'device_state_busy_at' })
    deviceStateBusyAt: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'fax_detect',
    })
    faxDetect: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 't38_udptl',
    })
    t38Udptl: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: T38UdptlEc,
        nullable: true,
        name: 't38_udptl_ec',
    })
    t38UdptlEc: T38UdptlEc | null;

    @Column({ nullable: true, name: 't38_udptl_maxdatagram' })
    t38UdptlMaxdatagram: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 't38_udptl_nat',
    })
    t38UdptlNat: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 't38_udptl_ipv6',
    })
    t38UdptlIpv6: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'tone_zone' })
    toneZone: string | null;

    @Column({ nullable: true })
    language: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'one_touch_recording',
    })
    oneTouchRecording: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'record_on_feature' })
    recordOnFeature: string | null;

    @Column({ nullable: true, name: 'record_off_feature' })
    recordOffFeature: string | null;

    @Column({ nullable: true, name: 'rtp_engine' })
    rtpEngine: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'allow_transfer',
    })
    allowTransfer: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'allow_subscribe',
    })
    allowSubscribe: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'sdp_owner' })
    sdpOwner: string | null;

    @Column({ nullable: true, name: 'sdp_session' })
    sdpSession: string | null;

    @Column({ nullable: true, name: 'tos_audio' })
    tosAudio: string | null;

    @Column({ nullable: true, name: 'tos_video' })
    tosVideo: string | null;

    @Column({ nullable: true, name: 'sub_min_expiry' })
    subMinExpiry: number | null;

    @Column({ nullable: true, name: 'from_domain' })
    fromDomain: string | null;

    @Column({ nullable: true, name: 'from_user' })
    fromUser: string | null;

    @Column({ nullable: true, name: 'mwi_from_user' })
    mwiFromUser: string | null;

    @Column({ nullable: true, name: 'dtls_verify' })
    dtlsVerify: string | null;

    @Column({ nullable: true, name: 'dtls_rekey' })
    dtlsRekey: string | null;

    @Column({ nullable: true, name: 'dtls_cert_file' })
    dtlsCertFile: string | null;

    @Column({ nullable: true, name: 'dtls_private_key' })
    dtlsPrivateKey: string | null;

    @Column({ nullable: true, name: 'dtls_cipher' })
    dtlsCipher: string | null;

    @Column({ nullable: true, name: 'dtls_ca_file' })
    dtlsCaFile: string | null;

    @Column({ nullable: true, name: 'dtls_ca_path' })
    dtlsCaPath: string | null;

    @Column({
        type: 'enum',
        enum: DtlsSetup,
        nullable: true,
        name: 'dtls_setup',
    })
    dtlsSetup: DtlsSetup | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'srtp_tag_32',
    })
    srtpTag32: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'media_address' })
    mediaAddress: string | null;

    @Column({
        type: 'enum',
        enum: RedirectMethod,
        nullable: true,
        name: 'redirect_method',
    })
    redirectMethod: RedirectMethod | null;

    @Column({ nullable: true, name: 'set_var' })
    setVar: string | null;

    @Column({ nullable: true, name: 'cos_audio' })
    cosAudio: number | null;

    @Column({ nullable: true, name: 'cos_video' })
    cosVideo: number | null;

    @Column({ nullable: true, name: 'message_context' })
    messageContext: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'force_avp',
    })
    forceAvp: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'media_use_received_transport',
    })
    mediaUseReceivedTransport: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    accountcode: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'user_eq_phone',
    })
    userEqPhone: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'moh_passthrough',
    })
    mohPassthrough: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'media_encryption_optimistic',
    })
    mediaEncryptionOptimistic: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'rpid_immediate',
    })
    rpidImmediate: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'g726_non_standard',
    })
    g726NonStandard: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'rtp_keepalive' })
    rtpKeepalive: number | null;

    @Column({ nullable: true, name: 'rtp_timeout' })
    rtpTimeout: number | null;

    @Column({ nullable: true, name: 'rtp_timeout_hold' })
    rtpTimeoutHold: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'bind_rtp_to_media_address',
    })
    bindRtpToMediaAddress: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'voicemail_extension' })
    voicemailExtension: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'mwi_subscribe_replaces_unsolicited',
    })
    mwiSubscribeReplacesUnsolicited: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    deny: string | null;

    @Column({ nullable: true })
    permit: string | null;

    @Column({ nullable: true })
    acl: string | null;

    @Column({ nullable: true, name: 'contact_deny' })
    contactDeny: string | null;

    @Column({ nullable: true, name: 'contact_permit' })
    contactPermit: string | null;

    @Column({ nullable: true, name: 'contact_acl' })
    contactAcl: string | null;

    @Column({ nullable: true, name: 'subscribe_context' })
    subscribeContext: string | null;

    @Column({ nullable: true, name: 'fax_detect_timeout' })
    faxDetectTimeout: number | null;

    @Column({ nullable: true, name: 'contact_user' })
    contactUser: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'preferred_codec_only',
    })
    preferredCodecOnly: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'asymmetric_rtp_codec',
    })
    asymmetricRtpCodec: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'rtcp_mux',
    })
    rtcpMux: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'allow_overlap',
    })
    allowOverlap: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'refer_blind_progress',
    })
    referBlindProgress: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'notify_early_inuse_ringing',
    })
    notifyEarlyInuseRinging: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'max_audio_streams' })
    maxAudioStreams: number | null;

    @Column({ nullable: true, name: 'max_video_streams' })
    maxVideoStreams: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    webrtc: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DtlsFingerprint,
        nullable: true,
        name: 'dtls_fingerprint',
    })
    dtlsFingerprint: DtlsFingerprint | null;

    @Column({ nullable: true, name: 'incoming_mwi_mailbox' })
    incomingMwiMailbox: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    bundle: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'dtls_auto_generate_cert',
    })
    dtlsAutoGenerateCert: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'follow_early_media_fork',
    })
    followEarlyMediaFork: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'accept_multiple_sdp_answers',
    })
    acceptMultipleSdpAnswers: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'suppress_q850_reason_headers',
    })
    suppressQ850ReasonHeaders: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'trust_connected_line',
    })
    trustConnectedLine: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'send_connected_line',
    })
    sendConnectedLine: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'ignore_183_without_sdp',
    })
    ignore183WithoutSdp: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'codec_prefs_incoming_offer' })
    codecPrefsIncomingOffer: string | null;

    @Column({ nullable: true, name: 'codec_prefs_outgoing_offer' })
    codecPrefsOutgoingOffer: string | null;

    @Column({ nullable: true, name: 'codec_prefs_incoming_answer' })
    codecPrefsIncomingAnswer: string | null;

    @Column({ nullable: true, name: 'codec_prefs_outgoing_answer' })
    codecPrefsOutgoingAnswer: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'stir_shaken',
    })
    stirShaken: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'send_history_info',
    })
    sendHistoryInfo: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'allow_unauthenticated_options',
    })
    allowUnauthenticatedOptions: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 't38_bind_udptl_to_media_address',
    })
    t38BindUdptlToMediaAddress: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'geoloc_incoming_call_profile' })
    geolocIncomingCallProfile: string | null;

    @Column({ nullable: true, name: 'geoloc_outgoing_call_profile' })
    geolocOutgoingCallProfile: string | null;

    @Column({
        type: 'enum',
        enum: IncomingCallOfferPref,
        nullable: true,
        name: 'incoming_call_offer_pref',
    })
    incomingCallOfferPref: IncomingCallOfferPref | null;

    @Column({
        type: 'enum',
        enum: OutgoingCallOfferPref,
        nullable: true,
        name: 'outgoing_call_offer_pref',
    })
    outgoingCallOfferPref: OutgoingCallOfferPref | null;

    @Column({ nullable: true, name: 'stir_shaken_profile' })
    stirShakenProfile: string | null;

    @Column({
        type: 'enum',
        enum: SecurityNegotiation,
        nullable: true,
        name: 'security_negotiation',
    })
    securityNegotiation: SecurityNegotiation | null;

    @Column({ nullable: true, name: 'security_mechanisms' })
    securityMechanisms: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
        name: 'send_aoc',
    })
    sendAoc: DefaultYesNoAsterisk | null;

    @Column({ nullable: true, name: 'overlap_context' })
    overlapContext: string | null;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt: Date;
}
