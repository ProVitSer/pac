import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1725182854974 implements MigrationInterface {
    name = 'Pac1725182854974';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TYPE "public"."ps_transports_method_enum" AS ENUM('default', 'unspecified', 'tlsv1', 'tlsv1_1', 'tlsv1_2', 'tlsv1_3', 'sslv2', 'sslv23', 'sslv3')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_transports_protocol_enum" AS ENUM('udp', 'tcp', 'tls', 'ws', 'wss', 'flow')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_transports_require_client_cert_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_transports_verify_client_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_transports_verify_server_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_transports_allow_reload_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_transports_symmetric_transport_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_transports_allow_wildcard_certs_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_transports" ("id" character varying(40) NOT NULL, "async_operations" integer, "bind" character varying, "ca_list_file" character varying, "cert_file" character varying, "cipher" character varying, "domain" character varying, "external_media_address" character varying, "external_signaling_address" character varying, "external_signaling_port" integer, "method" "public"."ps_transports_method_enum", "local_net" character varying, "password" character varying, "privKeyFile" character varying, "protocol" "public"."ps_transports_protocol_enum", "require_client_cert" "public"."ps_transports_require_client_cert_enum", "verify_client" "public"."ps_transports_verify_client_enum", "verify_server" "public"."ps_transports_verify_server_enum", "tos" character varying, "cos" integer, "allow_reload" "public"."ps_transports_allow_reload_enum", "symmetric_transport" "public"."ps_transports_symmetric_transport_enum", "allow_wildcard_certs" "public"."ps_transports_allow_wildcard_certs_enum", "tcp_keepalive_enable" boolean, "tcp_keepalive_idle_time" integer, "tcp_keepalive_interval_time" integer, "tcp_keepalive_probe_count" integer, CONSTRAINT "PK_195e65d0452158835924b1bde6e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_direct_media_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_connected_line_method_enum" AS ENUM('invite', 'reinvite', 'update')`);
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_direct_media_method_enum" AS ENUM('invite', 'reinvite', 'update')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_direct_media_glare_mitigation_enum" AS ENUM('none', 'outgoing', 'incoming')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_disable_direct_media_on_nat_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_dtmf_mode_enum" AS ENUM('rfc4733', 'inband', 'info', 'auto', 'auto_info')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_force_rport_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_ice_support_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_rewrite_contact_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_rtp_ipv6_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_rtp_symmetric_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_send_diversion_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_send_pai_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_send_rpid_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_timers_enum" AS ENUM('forced', 'no', 'required', 'yes')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_callerid_privacy_enum" AS ENUM('allowed_not_screened', 'allowed_passed_screened', 'allowed_failed_screened', 'allowed', 'prohib_not_screened', 'prohib_passed_screened', 'prohib_failed_screened', 'prohib', 'unavailable')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_aggregate_mwi_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_trust_id_inbound_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_trust_id_outbound_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_use_ptime_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_use_avpf_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_media_encryption_enum" AS ENUM('no', 'sdes', 'dtls')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_inband_progress_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_fax_detect_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_t38_udptl_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_t38_udptl_ec_enum" AS ENUM('none', 'fec', 'redundancy')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_t38_udptl_nat_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_t38_udptl_ipv6_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_one_touch_recording_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_allow_transfer_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_allow_subscribe_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_dtls_setup_enum" AS ENUM('active', 'passive', 'actpass')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_srtp_tag_32_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_redirect_method_enum" AS ENUM('user', 'uri_core', 'uri_pjsip')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_force_avp_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_media_use_received_transport_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_user_eq_phone_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_moh_passthrough_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_media_encryption_optimistic_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_rpid_immediate_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_g726_non_standard_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_bind_rtp_to_media_address_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_mwi_subscribe_replaces_unsolicited_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_preferred_codec_only_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_asymmetric_rtp_codec_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_rtcp_mux_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_allow_overlap_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_refer_blind_progress_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_notify_early_inuse_ringing_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_webrtc_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_dtls_fingerprint_enum" AS ENUM('SHA-1', 'SHA-256')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_bundle_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_dtls_auto_generate_cert_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_follow_early_media_fork_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_accept_multiple_sdp_answers_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_suppress_q850_reason_headers_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_trust_connected_line_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_send_connected_line_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_ignore_183_without_sdp_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_stir_shaken_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_send_history_info_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_allow_unauthenticated_options_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_t38_bind_udptl_to_media_address_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_incoming_call_offer_pref_enum" AS ENUM('local', 'local_first', 'remote', 'remote_first')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_outgoing_call_offer_pref_enum" AS ENUM('local', 'local_merge', 'local_first', 'remote', 'remote_merge', 'remote_first')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_endpoints_security_negotiation_enum" AS ENUM('no', 'mediasec')`);
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoints_send_aoc_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_endpoints" ("id" character varying NOT NULL, "transport" character varying, "aors" character varying, "auth" character varying, "context" character varying, "disallow" character varying, "allow" character varying, "direct_media" "public"."ps_endpoints_direct_media_enum", "connected_line_method" "public"."ps_endpoints_connected_line_method_enum", "direct_media_method" "public"."ps_endpoints_direct_media_method_enum", "direct_media_glare_mitigation" "public"."ps_endpoints_direct_media_glare_mitigation_enum", "disable_direct_media_on_nat" "public"."ps_endpoints_disable_direct_media_on_nat_enum", "dtmf_mode" "public"."ps_endpoints_dtmf_mode_enum", "external_media_address" character varying, "force_rport" "public"."ps_endpoints_force_rport_enum", "ice_support" "public"."ps_endpoints_ice_support_enum", "identify_by" character varying, "mailboxes" character varying, "moh_suggest" character varying, "outbound_auth" character varying, "outbound_proxy" character varying, "rewrite_contact" "public"."ps_endpoints_rewrite_contact_enum", "rtp_ipv6" "public"."ps_endpoints_rtp_ipv6_enum", "rtp_symmetric" "public"."ps_endpoints_rtp_symmetric_enum", "send_diversion" "public"."ps_endpoints_send_diversion_enum", "send_pai" "public"."ps_endpoints_send_pai_enum", "send_rpid" "public"."ps_endpoints_send_rpid_enum", "timers_min_se" integer, "timers" "public"."ps_endpoints_timers_enum", "timers_sess_expires" integer, "callerid" character varying, "callerid_privacy" "public"."ps_endpoints_callerid_privacy_enum", "callerid_tag" character varying, "aggregate_mwi" "public"."ps_endpoints_aggregate_mwi_enum", "trust_id_inbound" "public"."ps_endpoints_trust_id_inbound_enum", "trust_id_outbound" "public"."ps_endpoints_trust_id_outbound_enum", "use_ptime" "public"."ps_endpoints_use_ptime_enum", "use_avpf" "public"."ps_endpoints_use_avpf_enum", "media_encryption" "public"."ps_endpoints_media_encryption_enum", "inband_progress" "public"."ps_endpoints_inband_progress_enum", "call_group" character varying, "pickup_group" character varying, "named_call_group" character varying, "named_pickup_group" character varying, "device_state_busy_at" integer, "fax_detect" "public"."ps_endpoints_fax_detect_enum", "t38_udptl" "public"."ps_endpoints_t38_udptl_enum", "t38_udptl_ec" "public"."ps_endpoints_t38_udptl_ec_enum", "t38_udptl_maxdatagram" integer, "t38_udptl_nat" "public"."ps_endpoints_t38_udptl_nat_enum", "t38_udptl_ipv6" "public"."ps_endpoints_t38_udptl_ipv6_enum", "tone_zone" character varying, "language" character varying, "one_touch_recording" "public"."ps_endpoints_one_touch_recording_enum", "record_on_feature" character varying, "record_off_feature" character varying, "rtp_engine" character varying, "allow_transfer" "public"."ps_endpoints_allow_transfer_enum", "allow_subscribe" "public"."ps_endpoints_allow_subscribe_enum", "sdp_owner" character varying, "sdp_session" character varying, "tos_audio" character varying, "tos_video" character varying, "sub_min_expiry" integer, "from_domain" character varying, "from_user" character varying, "mwi_from_user" character varying, "dtls_verify" character varying, "dtls_rekey" character varying, "dtls_cert_file" character varying, "dtls_private_key" character varying, "dtls_cipher" character varying, "dtls_ca_file" character varying, "dtls_ca_path" character varying, "dtls_setup" "public"."ps_endpoints_dtls_setup_enum", "srtp_tag_32" "public"."ps_endpoints_srtp_tag_32_enum", "media_address" character varying, "redirect_method" "public"."ps_endpoints_redirect_method_enum", "set_var" character varying, "cos_audio" integer, "cos_video" integer, "message_context" character varying, "force_avp" "public"."ps_endpoints_force_avp_enum", "media_use_received_transport" "public"."ps_endpoints_media_use_received_transport_enum", "accountcode" character varying, "user_eq_phone" "public"."ps_endpoints_user_eq_phone_enum", "moh_passthrough" "public"."ps_endpoints_moh_passthrough_enum", "media_encryption_optimistic" "public"."ps_endpoints_media_encryption_optimistic_enum", "rpid_immediate" "public"."ps_endpoints_rpid_immediate_enum", "g726_non_standard" "public"."ps_endpoints_g726_non_standard_enum", "rtp_keepalive" integer, "rtp_timeout" integer, "rtp_timeout_hold" integer, "bind_rtp_to_media_address" "public"."ps_endpoints_bind_rtp_to_media_address_enum", "voicemail_extension" character varying, "mwi_subscribe_replaces_unsolicited" "public"."ps_endpoints_mwi_subscribe_replaces_unsolicited_enum", "deny" character varying, "permit" character varying, "acl" character varying, "contact_deny" character varying, "contact_permit" character varying, "contact_acl" character varying, "subscribe_context" character varying, "fax_detect_timeout" integer, "contact_user" character varying, "preferred_codec_only" "public"."ps_endpoints_preferred_codec_only_enum", "asymmetric_rtp_codec" "public"."ps_endpoints_asymmetric_rtp_codec_enum", "rtcp_mux" "public"."ps_endpoints_rtcp_mux_enum", "allow_overlap" "public"."ps_endpoints_allow_overlap_enum", "refer_blind_progress" "public"."ps_endpoints_refer_blind_progress_enum", "notify_early_inuse_ringing" "public"."ps_endpoints_notify_early_inuse_ringing_enum", "max_audio_streams" integer, "max_video_streams" integer, "webrtc" "public"."ps_endpoints_webrtc_enum", "dtls_fingerprint" "public"."ps_endpoints_dtls_fingerprint_enum", "incoming_mwi_mailbox" character varying, "bundle" "public"."ps_endpoints_bundle_enum", "dtls_auto_generate_cert" "public"."ps_endpoints_dtls_auto_generate_cert_enum", "follow_early_media_fork" "public"."ps_endpoints_follow_early_media_fork_enum", "accept_multiple_sdp_answers" "public"."ps_endpoints_accept_multiple_sdp_answers_enum", "suppress_q850_reason_headers" "public"."ps_endpoints_suppress_q850_reason_headers_enum", "trust_connected_line" "public"."ps_endpoints_trust_connected_line_enum", "send_connected_line" "public"."ps_endpoints_send_connected_line_enum", "ignore_183_without_sdp" "public"."ps_endpoints_ignore_183_without_sdp_enum", "codec_prefs_incoming_offer" character varying, "codec_prefs_outgoing_offer" character varying, "codec_prefs_incoming_answer" character varying, "codec_prefs_outgoing_answer" character varying, "stir_shaken" "public"."ps_endpoints_stir_shaken_enum", "send_history_info" "public"."ps_endpoints_send_history_info_enum", "allow_unauthenticated_options" "public"."ps_endpoints_allow_unauthenticated_options_enum", "t38_bind_udptl_to_media_address" "public"."ps_endpoints_t38_bind_udptl_to_media_address_enum", "geoloc_incoming_call_profile" character varying, "geoloc_outgoing_call_profile" character varying, "incoming_call_offer_pref" "public"."ps_endpoints_incoming_call_offer_pref_enum", "outgoing_call_offer_pref" "public"."ps_endpoints_outgoing_call_offer_pref_enum", "stir_shaken_profile" character varying, "security_negotiation" "public"."ps_endpoints_security_negotiation_enum", "security_mechanisms" character varying, "send_aoc" "public"."ps_endpoints_send_aoc_enum", "overlap_context" character varying, CONSTRAINT "PK_e6f3c9a4a71d193e36cbcdb2f19" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_registrations_auth_rejection_permanent_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_registrations_support_path_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_registrations_line_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_registrations_support_outbound_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_registrations_security_negotiation_enum" AS ENUM('no', 'mediasec')`);
        await queryRunner.query(
            `CREATE TABLE "ps_registrations" ("id" character varying NOT NULL, "auth_rejection_permanent" "public"."ps_registrations_auth_rejection_permanent_enum", "client_uri" character varying, "contact_user" character varying, "expiration" integer, "max_retries" integer, "outbound_auth" character varying, "outbound_proxy" character varying, "retry_interval" integer, "forbidden_retry_interval" integer, "server_uri" character varying, "transport" character varying, "support_path" "public"."ps_registrations_support_path_enum", "fatal_retry_interval" integer, "line" "public"."ps_registrations_line_enum", "endpoint" character varying, "support_outbound" "public"."ps_registrations_support_outbound_enum", "contact_header_params" character varying, "maxRandomInitialDelay" integer, "security_negotiation" "public"."ps_registrations_security_negotiation_enum", "security_mechanisms" character varying, CONSTRAINT "PK_08ff59888507efb8a32a4310ef3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE TYPE "public"."ps_auths_authtype_enum" AS ENUM('md5', 'userpass', 'google_oauth')`);
        await queryRunner.query(
            `CREATE TABLE "ps_auths" ("id" character varying NOT NULL, "authType" "public"."ps_auths_authtype_enum" NOT NULL, "nonce_lifetime" integer, "md5_cred" character varying, "password" character varying, "realm" character varying, "username" character varying, "refresh_token" character varying, "oauth_clientid" character varying, "oauth_secret" character varying, CONSTRAINT "PK_b5f97af54ea96fbedad6b64fa24" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_endpoint_id_ips_srv_lookups_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_endpoint_id_ips" ("id" character varying NOT NULL, "endpoint" character varying, "match" character varying, "srv_lookups" "public"."ps_endpoint_id_ips_srv_lookups_enum", "match_header" character varying, "match_request_uri" character varying, CONSTRAINT "PK_0f022825f42ef226560efc04e05" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_aors_remove_existing_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_aors_authenticate_qualify_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_aors_support_path_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TYPE "public"."ps_aors_remove_unavailable_enum" AS ENUM('0', '1', 'off', 'on', 'false', 'true', 'no', 'yes')`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_aors" ("id" character varying NOT NULL, "contact" character varying, "default_expiration" integer, "mailboxes" character varying, "max_contacts" integer, "minimum_expiration" integer, "remove_existing" "public"."ps_aors_remove_existing_enum", "qualify_frequency" integer, "authenticate_qualify" "public"."ps_aors_authenticate_qualify_enum", "maximum_expiration" integer, "outbound_proxy" character varying, "support_path" "public"."ps_aors_support_path_enum", "qualify_timeout" integer, "voicemail_extension" character varying, "remove_unavailable" "public"."ps_aors_remove_unavailable_enum", CONSTRAINT "PK_265dfd1870d6bed76a540d9cb4b" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "extensions" ("id" BIGSERIAL NOT NULL, "context" character varying NOT NULL, "exten" character varying NOT NULL, "priority" integer NOT NULL, "app" character varying NOT NULL, "appdata" character varying NOT NULL, CONSTRAINT "PK_3632b8148c8f511650d3f3eda06" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE UNIQUE INDEX "extensions_pkey" ON "extensions" ("id") `);
        await queryRunner.query(
            `CREATE UNIQUE INDEX "extensions_context_exten_priority_key" ON "extensions" ("context", "exten", "priority") `,
        );
        await queryRunner.query(`ALTER TYPE "public"."users_permissions_enum" RENAME TO "users_permissions_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_permissions_enum" AS ENUM('Delete', 'Create', 'Update', 'Read')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "permissions" TYPE "public"."users_permissions_enum"[] USING "permissions"::"text"::"public"."users_permissions_enum"[]`,
        );
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" SET DEFAULT '{Read}'`);
        await queryRunner.query(`DROP TYPE "public"."users_permissions_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."users_roles_enum" RENAME TO "users_roles_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('User', 'Manager', 'Admin', 'Api')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "roles" TYPE "public"."users_roles_enum"[] USING "roles"::"text"::"public"."users_roles_enum"[]`,
        );
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT '{User}'`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum_old" AS ENUM('User', 'Admin')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "roles" TYPE "public"."users_roles_enum_old"[] USING "roles"::"text"::"public"."users_roles_enum_old"[]`,
        );
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "roles" SET DEFAULT '{User}'`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_roles_enum_old" RENAME TO "users_roles_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."users_permissions_enum_old" AS ENUM('DeletePost', 'CreateCategory')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" DROP DEFAULT`);
        await queryRunner.query(
            `ALTER TABLE "users" ALTER COLUMN "permissions" TYPE "public"."users_permissions_enum_old"[] USING "permissions"::"text"::"public"."users_permissions_enum_old"[]`,
        );
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" SET DEFAULT '{}'`);
        await queryRunner.query(`DROP TYPE "public"."users_permissions_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_permissions_enum_old" RENAME TO "users_permissions_enum"`);
        await queryRunner.query(`DROP INDEX "public"."extensions_context_exten_priority_key"`);
        await queryRunner.query(`DROP INDEX "public"."extensions_pkey"`);
        await queryRunner.query(`DROP TABLE "extensions"`);
        await queryRunner.query(`DROP TABLE "ps_aors"`);
        await queryRunner.query(`DROP TYPE "public"."ps_aors_remove_unavailable_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_aors_support_path_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_aors_authenticate_qualify_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_aors_remove_existing_enum"`);
        await queryRunner.query(`DROP TABLE "ps_endpoint_id_ips"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoint_id_ips_srv_lookups_enum"`);
        await queryRunner.query(`DROP TABLE "ps_auths"`);
        await queryRunner.query(`DROP TYPE "public"."ps_auths_authtype_enum"`);
        await queryRunner.query(`DROP TABLE "ps_registrations"`);
        await queryRunner.query(`DROP TYPE "public"."ps_registrations_security_negotiation_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_registrations_support_outbound_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_registrations_line_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_registrations_support_path_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_registrations_auth_rejection_permanent_enum"`);
        await queryRunner.query(`DROP TABLE "ps_endpoints"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_send_aoc_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_security_negotiation_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_outgoing_call_offer_pref_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_incoming_call_offer_pref_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_t38_bind_udptl_to_media_address_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_allow_unauthenticated_options_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_send_history_info_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_stir_shaken_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_ignore_183_without_sdp_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_send_connected_line_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_trust_connected_line_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_suppress_q850_reason_headers_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_accept_multiple_sdp_answers_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_follow_early_media_fork_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_dtls_auto_generate_cert_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_bundle_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_dtls_fingerprint_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_webrtc_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_notify_early_inuse_ringing_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_refer_blind_progress_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_allow_overlap_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_rtcp_mux_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_asymmetric_rtp_codec_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_preferred_codec_only_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_mwi_subscribe_replaces_unsolicited_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_bind_rtp_to_media_address_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_g726_non_standard_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_rpid_immediate_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_media_encryption_optimistic_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_moh_passthrough_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_user_eq_phone_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_media_use_received_transport_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_force_avp_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_redirect_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_srtp_tag_32_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_dtls_setup_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_allow_subscribe_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_allow_transfer_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_one_touch_recording_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_t38_udptl_ipv6_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_t38_udptl_nat_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_t38_udptl_ec_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_t38_udptl_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_fax_detect_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_inband_progress_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_media_encryption_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_use_avpf_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_use_ptime_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_trust_id_outbound_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_trust_id_inbound_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_aggregate_mwi_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_callerid_privacy_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_timers_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_send_rpid_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_send_pai_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_send_diversion_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_rtp_symmetric_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_rtp_ipv6_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_rewrite_contact_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_ice_support_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_force_rport_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_dtmf_mode_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_disable_direct_media_on_nat_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_direct_media_glare_mitigation_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_direct_media_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_connected_line_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_endpoints_direct_media_enum"`);
        await queryRunner.query(`DROP TABLE "ps_transports"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_allow_wildcard_certs_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_symmetric_transport_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_allow_reload_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_verify_server_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_verify_client_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_require_client_cert_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_protocol_enum"`);
        await queryRunner.query(`DROP TYPE "public"."ps_transports_method_enum"`);
    }
}
