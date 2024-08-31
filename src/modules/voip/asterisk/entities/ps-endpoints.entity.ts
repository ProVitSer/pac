import { Column, Entity } from 'typeorm';
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
    @Column()
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
    })
    direct_media: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: ConnectedLineMethod,
        nullable: true,
    })
    connected_line_method: ConnectedLineMethod | null;

    @Column({
        type: 'enum',
        enum: DirectMediaMethod,
        nullable: true,
    })
    direct_media_method: DirectMediaMethod | null;

    @Column({
        type: 'enum',
        enum: DirectMediaGlareMitigation,
        nullable: true,
    })
    direct_media_glare_mitigation: DirectMediaGlareMitigation | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    disable_direct_media_on_nat: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DtmfMode,
        nullable: true,
    })
    dtmf_mode: DtmfMode | null;

    @Column({ nullable: true })
    external_media_address: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    force_rport: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    ice_support: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    identify_by: string | null;

    @Column({ nullable: true })
    mailboxes: string | null;

    @Column({ nullable: true })
    moh_suggest: string | null;

    @Column({ nullable: true })
    outbound_auth: string | null;

    @Column({ nullable: true })
    outbound_proxy: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    rewrite_contact: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    rtp_ipv6: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    rtp_symmetric: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    send_diversion: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    send_pai: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    send_rpid: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    timers_min_se: number | null;

    @Column({
        type: 'enum',
        enum: Timers,
        nullable: true,
    })
    timers: Timers | null;

    @Column({ nullable: true })
    timers_sess_expires: number | null;

    @Column({ nullable: true })
    callerid: string | null;

    @Column({
        type: 'enum',
        enum: CalleridPrivacy,
        nullable: true,
    })
    callerid_privacy: CalleridPrivacy | null;

    @Column({ nullable: true })
    callerid_tag: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    aggregate_mwi: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    trust_id_inbound: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    trust_id_outbound: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    use_ptime: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    use_avpf: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: MediaEncryption,
        nullable: true,
    })
    media_encryption: MediaEncryption | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    inband_progress: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    call_group: string | null;

    @Column({ nullable: true })
    pickup_group: string | null;

    @Column({ nullable: true })
    named_call_group: string | null;

    @Column({ nullable: true })
    named_pickup_group: string | null;

    @Column({ nullable: true })
    device_state_busy_at: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    fax_detect: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    t38_udptl: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: T38UdptlEc,
        nullable: true,
    })
    t38_udptl_ec: T38UdptlEc | null;

    @Column({ nullable: true })
    t38_udptl_maxdatagram: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    t38_udptl_nat: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    t38_udptl_ipv6: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    tone_zone: string | null;

    @Column({ nullable: true })
    language: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    one_touch_recording: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    record_on_feature: string | null;

    @Column({ nullable: true })
    record_off_feature: string | null;

    @Column({ nullable: true })
    rtp_engine: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    allow_transfer: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    allow_subscribe: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    sdp_owner: string | null;

    @Column({ nullable: true })
    sdp_session: string | null;

    @Column({ nullable: true })
    tos_audio: string | null;

    @Column({ nullable: true })
    tos_video: string | null;

    @Column({ nullable: true })
    sub_min_expiry: number | null;

    @Column({ nullable: true })
    from_domain: string | null;

    @Column({ nullable: true })
    from_user: string | null;

    @Column({ nullable: true })
    mwi_from_user: string | null;

    @Column({ nullable: true })
    dtls_verify: string | null;

    @Column({ nullable: true })
    dtls_rekey: string | null;

    @Column({ nullable: true })
    dtls_cert_file: string | null;

    @Column({ nullable: true })
    dtls_private_key: string | null;

    @Column({ nullable: true })
    dtls_cipher: string | null;

    @Column({ nullable: true })
    dtls_ca_file: string | null;

    @Column({ nullable: true })
    dtls_ca_path: string | null;

    @Column({
        type: 'enum',
        enum: DtlsSetup,
        nullable: true,
    })
    dtls_setup: DtlsSetup | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    srtp_tag_32: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    media_address: string | null;

    @Column({
        type: 'enum',
        enum: RedirectMethod,
        nullable: true,
    })
    redirect_method: RedirectMethod | null;

    @Column({ nullable: true })
    set_var: string | null;

    @Column({ nullable: true })
    cos_audio: number | null;

    @Column({ nullable: true })
    cos_video: number | null;

    @Column({ nullable: true })
    message_context: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    force_avp: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    media_use_received_transport: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    accountcode: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    user_eq_phone: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    moh_passthrough: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    media_encryption_optimistic: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    rpid_immediate: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    g726_non_standard: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    rtp_keepalive: number | null;

    @Column({ nullable: true })
    rtp_timeout: number | null;

    @Column({ nullable: true })
    rtp_timeout_hold: number | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    bind_rtp_to_media_address: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    voicemail_extension: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    mwi_subscribe_replaces_unsolicited: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    deny: string | null;

    @Column({ nullable: true })
    permit: string | null;

    @Column({ nullable: true })
    acl: string | null;

    @Column({ nullable: true })
    contact_deny: string | null;

    @Column({ nullable: true })
    contact_permit: string | null;

    @Column({ nullable: true })
    contact_acl: string | null;

    @Column({ nullable: true })
    subscribe_context: string | null;

    @Column({ nullable: true })
    fax_detect_timeout: number | null;

    @Column({ nullable: true })
    contact_user: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    preferred_codec_only: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    asymmetric_rtp_codec: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    rtcp_mux: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    allow_overlap: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    refer_blind_progress: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    notify_early_inuse_ringing: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    max_audio_streams: number | null;

    @Column({ nullable: true })
    max_video_streams: number | null;

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
    })
    dtls_fingerprint: DtlsFingerprint | null;

    @Column({ nullable: true })
    incoming_mwi_mailbox: string | null;

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
    })
    dtls_auto_generate_cert: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    follow_early_media_fork: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    accept_multiple_sdp_answers: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    suppress_q850_reason_headers: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    trust_connected_line: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    send_connected_line: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    ignore_183_without_sdp: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    codec_prefs_incoming_offer: string | null;

    @Column({ nullable: true })
    codec_prefs_outgoing_offer: string | null;

    @Column({ nullable: true })
    codec_prefs_incoming_answer: string | null;

    @Column({ nullable: true })
    codec_prefs_outgoing_answer: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    stir_shaken: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    send_history_info: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    allow_unauthenticated_options: DefaultYesNoAsterisk | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    t38_bind_udptl_to_media_address: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    geoloc_incoming_call_profile: string | null;

    @Column({ nullable: true })
    geoloc_outgoing_call_profile: string | null;

    @Column({
        type: 'enum',
        enum: IncomingCallOfferPref,
        nullable: true,
    })
    incoming_call_offer_pref: IncomingCallOfferPref | null;

    @Column({
        type: 'enum',
        enum: OutgoingCallOfferPref,
        nullable: true,
    })
    outgoing_call_offer_pref: OutgoingCallOfferPref | null;

    @Column({ nullable: true })
    stir_shaken_profile: string | null;

    @Column({
        type: 'enum',
        enum: SecurityNegotiation,
        nullable: true,
    })
    security_negotiation: SecurityNegotiation | null;

    @Column({ nullable: true })
    security_mechanisms: string | null;

    @Column({
        type: 'enum',
        enum: DefaultYesNoAsterisk,
        nullable: true,
    })
    send_aoc: DefaultYesNoAsterisk | null;

    @Column({ nullable: true })
    overlap_context: string | null;
}
