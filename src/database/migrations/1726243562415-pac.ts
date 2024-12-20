import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1726243562415 implements MigrationInterface {
    name = 'Pac1726243562415';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "products" ("id" SERIAL NOT NULL, "product_type" "public"."products_product_type_enum" NOT NULL DEFAULT 'api', "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a89bd51c8d5b29c8b344da255c3" UNIQUE ("product_type"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "licenses" ("id" SERIAL NOT NULL, "license" character varying NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "is_test" boolean NOT NULL DEFAULT true, "order" TIMESTAMP, "activate" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" integer, CONSTRAINT "UQ_13c7c21631ba7ab257d9e425381" UNIQUE ("license"), CONSTRAINT "REL_24121d1ef249fc30026bd4eeca" UNIQUE ("client_id"), CONSTRAINT "PK_da5021501ce80efa03de6f40086" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "files" ("id" SERIAL NOT NULL, "file_name" character varying NOT NULL, "generated_file_name" character varying NOT NULL, "generated_file_path" character varying NOT NULL, "path" character varying NOT NULL, "mimetype" character varying NOT NULL, "size" integer, "description" character varying, "application_service_type" "public"."files_application_service_type_enum" NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone_number" character varying, "name" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "latest_activity" TIMESTAMP, "registered_date" TIMESTAMP NOT NULL, "permissions" "public"."users_permissions_enum" array NOT NULL DEFAULT '{Read}', "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{User}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "call_quality_assessment_config" ("id" SERIAL NOT NULL, "audio_files" json, "voip_trunk_id" character varying, "client_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3aed85bc183a024f6fac521608a" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "call_quality_assessment_statistic" ("id" SERIAL NOT NULL, "rating" integer NOT NULL DEFAULT '0', "client_number" character varying NOT NULL, "number_region" character varying, "manager_data" character varying, "manager_number" character varying, "uniqueid" character varying NOT NULL, "call_result" "public"."call_quality_assessment_statistic_call_result_enum" NOT NULL DEFAULT 'unknown', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cqac_id" integer, "client_id" integer, CONSTRAINT "UQ_d2ddbdf0436ba7045305c3cafc9" UNIQUE ("uniqueid"), CONSTRAINT "PK_811cf87198676ba08d8bc2d2e79" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "pac_connector_grpc_server" ("id" SERIAL NOT NULL, "ip" character varying NOT NULL, "port" integer NOT NULL, "active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clien_id" integer, CONSTRAINT "REL_8bd40f7eb1ec0776d8d25f710b" UNIQUE ("clien_id"), CONSTRAINT "PK_c13d241fc362815c568f9661b62" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "client" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "company_name" character varying NOT NULL, "contact_person_name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "buh_id" character varying, "balance" integer NOT NULL DEFAULT '0', "deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49" UNIQUE ("client_id"), CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_368ca99acdbd5502fc08b3f779" ON "client" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_6436cc6b79593760b9ef921ef1" ON "client" ("email") `);
        await queryRunner.query(
            `CREATE TABLE "voip" ("id" SERIAL NOT NULL, "trunk_id" character varying NOT NULL, "application_service_type" "public"."voip_application_service_type_enum" NOT NULL, "trunk_status" "public"."voip_trunk_status_enum" NOT NULL DEFAULT 'Unregistered', "active" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "UQ_ea397d49e0d61fb487aba516b89" UNIQUE ("trunk_id"), CONSTRAINT "PK_3cc92279295f7578debec11fd8a" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "cdr" ("id" SERIAL NOT NULL, "calldate" TIMESTAMP NOT NULL, "clid" character varying NOT NULL, "src" character varying NOT NULL, "dst" character varying NOT NULL, "dcontext" character varying NOT NULL, "channel" character varying NOT NULL, "dstchannel" character varying NOT NULL, "lastapp" character varying, "lastdata" character varying, "duration" integer, "billsec" integer NOT NULL, "disposition" character varying NOT NULL, "amaflags" integer, "accountcode" character varying NOT NULL, "uniqueid" character varying NOT NULL, "linkedid" character varying NOT NULL, "userfield" character varying, "client_id" character varying NOT NULL, "application_service_type" character varying NOT NULL, CONSTRAINT "UQ_97e5ce5c236f71481f9fa1aa81c" UNIQUE ("uniqueid"), CONSTRAINT "PK_0d5afbe6ea3365788ca99fa9a8c" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_transports" ("id" character varying(40) NOT NULL, "async_operations" integer, "bind" character varying, "ca_list_file" character varying, "cert_file" character varying, "cipher" character varying, "domain" character varying, "external_media_address" character varying, "external_signaling_address" character varying, "external_signaling_port" integer, "method" "public"."ps_transports_method_enum", "local_net" character varying, "password" character varying, "privKeyFile" character varying, "protocol" "public"."ps_transports_protocol_enum", "require_client_cert" "public"."ps_transports_require_client_cert_enum", "verify_client" "public"."ps_transports_verify_client_enum", "verify_server" "public"."ps_transports_verify_server_enum", "tos" character varying, "cos" integer, "allow_reload" "public"."ps_transports_allow_reload_enum", "symmetric_transport" "public"."ps_transports_symmetric_transport_enum", "allow_wildcard_certs" "public"."ps_transports_allow_wildcard_certs_enum", "tcp_keepalive_enable" boolean, "tcp_keepalive_idle_time" integer, "tcp_keepalive_interval_time" integer, "tcp_keepalive_probe_count" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_195e65d0452158835924b1bde6e" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_endpoints" ("id" character varying NOT NULL, "transport" character varying, "aors" character varying, "auth" character varying, "context" character varying, "disallow" character varying, "allow" character varying, "direct_media" "public"."ps_endpoints_direct_media_enum", "connected_line_method" "public"."ps_endpoints_connected_line_method_enum", "direct_media_method" "public"."ps_endpoints_direct_media_method_enum", "direct_media_glare_mitigation" "public"."ps_endpoints_direct_media_glare_mitigation_enum", "disable_direct_media_on_nat" "public"."ps_endpoints_disable_direct_media_on_nat_enum", "dtmf_mode" "public"."ps_endpoints_dtmf_mode_enum", "external_media_address" character varying, "force_rport" "public"."ps_endpoints_force_rport_enum", "ice_support" "public"."ps_endpoints_ice_support_enum", "identify_by" character varying, "mailboxes" character varying, "moh_suggest" character varying, "outbound_auth" character varying, "outbound_proxy" character varying, "rewrite_contact" "public"."ps_endpoints_rewrite_contact_enum", "rtp_ipv6" "public"."ps_endpoints_rtp_ipv6_enum", "rtp_symmetric" "public"."ps_endpoints_rtp_symmetric_enum", "send_diversion" "public"."ps_endpoints_send_diversion_enum", "send_pai" "public"."ps_endpoints_send_pai_enum", "send_rpid" "public"."ps_endpoints_send_rpid_enum", "timers_min_se" integer, "timers" "public"."ps_endpoints_timers_enum", "timers_sess_expires" integer, "callerid" character varying, "callerid_privacy" "public"."ps_endpoints_callerid_privacy_enum", "callerid_tag" character varying, "aggregate_mwi" "public"."ps_endpoints_aggregate_mwi_enum", "trust_id_inbound" "public"."ps_endpoints_trust_id_inbound_enum", "trust_id_outbound" "public"."ps_endpoints_trust_id_outbound_enum", "use_ptime" "public"."ps_endpoints_use_ptime_enum", "use_avpf" "public"."ps_endpoints_use_avpf_enum", "media_encryption" "public"."ps_endpoints_media_encryption_enum", "inband_progress" "public"."ps_endpoints_inband_progress_enum", "call_group" character varying, "pickup_group" character varying, "named_call_group" character varying, "named_pickup_group" character varying, "device_state_busy_at" integer, "fax_detect" "public"."ps_endpoints_fax_detect_enum", "t38_udptl" "public"."ps_endpoints_t38_udptl_enum", "t38_udptl_ec" "public"."ps_endpoints_t38_udptl_ec_enum", "t38_udptl_maxdatagram" integer, "t38_udptl_nat" "public"."ps_endpoints_t38_udptl_nat_enum", "t38_udptl_ipv6" "public"."ps_endpoints_t38_udptl_ipv6_enum", "tone_zone" character varying, "language" character varying, "one_touch_recording" "public"."ps_endpoints_one_touch_recording_enum", "record_on_feature" character varying, "record_off_feature" character varying, "rtp_engine" character varying, "allow_transfer" "public"."ps_endpoints_allow_transfer_enum", "allow_subscribe" "public"."ps_endpoints_allow_subscribe_enum", "sdp_owner" character varying, "sdp_session" character varying, "tos_audio" character varying, "tos_video" character varying, "sub_min_expiry" integer, "from_domain" character varying, "from_user" character varying, "mwi_from_user" character varying, "dtls_verify" character varying, "dtls_rekey" character varying, "dtls_cert_file" character varying, "dtls_private_key" character varying, "dtls_cipher" character varying, "dtls_ca_file" character varying, "dtls_ca_path" character varying, "dtls_setup" "public"."ps_endpoints_dtls_setup_enum", "srtp_tag_32" "public"."ps_endpoints_srtp_tag_32_enum", "media_address" character varying, "redirect_method" "public"."ps_endpoints_redirect_method_enum", "set_var" character varying, "cos_audio" integer, "cos_video" integer, "message_context" character varying, "force_avp" "public"."ps_endpoints_force_avp_enum", "media_use_received_transport" "public"."ps_endpoints_media_use_received_transport_enum", "accountcode" character varying, "user_eq_phone" "public"."ps_endpoints_user_eq_phone_enum", "moh_passthrough" "public"."ps_endpoints_moh_passthrough_enum", "media_encryption_optimistic" "public"."ps_endpoints_media_encryption_optimistic_enum", "rpid_immediate" "public"."ps_endpoints_rpid_immediate_enum", "g726_non_standard" "public"."ps_endpoints_g726_non_standard_enum", "rtp_keepalive" integer, "rtp_timeout" integer, "rtp_timeout_hold" integer, "bind_rtp_to_media_address" "public"."ps_endpoints_bind_rtp_to_media_address_enum", "voicemail_extension" character varying, "mwi_subscribe_replaces_unsolicited" "public"."ps_endpoints_mwi_subscribe_replaces_unsolicited_enum", "deny" character varying, "permit" character varying, "acl" character varying, "contact_deny" character varying, "contact_permit" character varying, "contact_acl" character varying, "subscribe_context" character varying, "fax_detect_timeout" integer, "contact_user" character varying, "preferred_codec_only" "public"."ps_endpoints_preferred_codec_only_enum", "asymmetric_rtp_codec" "public"."ps_endpoints_asymmetric_rtp_codec_enum", "rtcp_mux" "public"."ps_endpoints_rtcp_mux_enum", "allow_overlap" "public"."ps_endpoints_allow_overlap_enum", "refer_blind_progress" "public"."ps_endpoints_refer_blind_progress_enum", "notify_early_inuse_ringing" "public"."ps_endpoints_notify_early_inuse_ringing_enum", "max_audio_streams" integer, "max_video_streams" integer, "webrtc" "public"."ps_endpoints_webrtc_enum", "dtls_fingerprint" "public"."ps_endpoints_dtls_fingerprint_enum", "incoming_mwi_mailbox" character varying, "bundle" "public"."ps_endpoints_bundle_enum", "dtls_auto_generate_cert" "public"."ps_endpoints_dtls_auto_generate_cert_enum", "follow_early_media_fork" "public"."ps_endpoints_follow_early_media_fork_enum", "accept_multiple_sdp_answers" "public"."ps_endpoints_accept_multiple_sdp_answers_enum", "suppress_q850_reason_headers" "public"."ps_endpoints_suppress_q850_reason_headers_enum", "trust_connected_line" "public"."ps_endpoints_trust_connected_line_enum", "send_connected_line" "public"."ps_endpoints_send_connected_line_enum", "ignore_183_without_sdp" "public"."ps_endpoints_ignore_183_without_sdp_enum", "codec_prefs_incoming_offer" character varying, "codec_prefs_outgoing_offer" character varying, "codec_prefs_incoming_answer" character varying, "codec_prefs_outgoing_answer" character varying, "stir_shaken" "public"."ps_endpoints_stir_shaken_enum", "send_history_info" "public"."ps_endpoints_send_history_info_enum", "allow_unauthenticated_options" "public"."ps_endpoints_allow_unauthenticated_options_enum", "t38_bind_udptl_to_media_address" "public"."ps_endpoints_t38_bind_udptl_to_media_address_enum", "geoloc_incoming_call_profile" character varying, "geoloc_outgoing_call_profile" character varying, "incoming_call_offer_pref" "public"."ps_endpoints_incoming_call_offer_pref_enum", "outgoing_call_offer_pref" "public"."ps_endpoints_outgoing_call_offer_pref_enum", "stir_shaken_profile" character varying, "security_negotiation" "public"."ps_endpoints_security_negotiation_enum", "security_mechanisms" character varying, "send_aoc" "public"."ps_endpoints_send_aoc_enum", "overlap_context" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e6f3c9a4a71d193e36cbcdb2f19" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_registrations" ("id" character varying NOT NULL, "auth_rejection_permanent" "public"."ps_registrations_auth_rejection_permanent_enum", "client_uri" character varying, "contact_user" character varying, "expiration" integer, "max_retries" integer, "outbound_auth" character varying, "outbound_proxy" character varying, "retry_interval" integer, "forbidden_retry_interval" integer, "server_uri" character varying, "transport" character varying, "support_path" "public"."ps_registrations_support_path_enum", "fatal_retry_interval" integer, "line" "public"."ps_registrations_line_enum", "endpoint" character varying, "support_outbound" "public"."ps_registrations_support_outbound_enum", "contact_header_params" character varying, "maxRandomInitialDelay" integer, "security_negotiation" "public"."ps_registrations_security_negotiation_enum", "security_mechanisms" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_08ff59888507efb8a32a4310ef3" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_auths" ("id" character varying NOT NULL, "auth_type" "public"."ps_auths_auth_type_enum" NOT NULL, "nonce_lifetime" integer, "md5_cred" character varying, "password" character varying, "realm" character varying, "username" character varying, "refresh_token" character varying, "oauth_clientid" character varying, "oauth_secret" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b5f97af54ea96fbedad6b64fa24" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_endpoint_id_ips" ("id" character varying NOT NULL, "endpoint" character varying, "match" character varying, "srv_lookups" "public"."ps_endpoint_id_ips_srv_lookups_enum", "match_header" character varying, "match_request_uri" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0f022825f42ef226560efc04e05" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "ps_aors" ("id" character varying NOT NULL, "contact" character varying, "default_expiration" integer, "mailboxes" character varying, "max_contacts" integer, "minimum_expiration" integer, "remove_existing" "public"."ps_aors_remove_existing_enum", "qualify_frequency" integer, "authenticate_qualify" "public"."ps_aors_authenticate_qualify_enum", "maximum_expiration" integer, "outbound_proxy" character varying, "support_path" "public"."ps_aors_support_path_enum", "qualify_timeout" integer, "voicemail_extension" character varying, "remove_unavailable" "public"."ps_aors_remove_unavailable_enum", "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_265dfd1870d6bed76a540d9cb4b" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "extensions" ("id" BIGSERIAL NOT NULL, "context" character varying NOT NULL, "exten" character varying NOT NULL, "priority" integer NOT NULL, "app" character varying NOT NULL, "appdata" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3632b8148c8f511650d3f3eda06" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE UNIQUE INDEX "extensions_pkey" ON "extensions" ("id") `);
        await queryRunner.query(
            `CREATE UNIQUE INDEX "extensions_context_exten_priority_key" ON "extensions" ("context", "exten", "priority") `,
        );
        await queryRunner.query(
            `CREATE TABLE "licenses_products_products" ("licensesId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_9535467a7c10ec8d88011ec0150" PRIMARY KEY ("licensesId", "productsId"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_9018ae20d6710e87026e022eb5" ON "licenses_products_products" ("licensesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e6d6290ddbddd6e485bf73415f" ON "licenses_products_products" ("productsId") `);
        await queryRunner.query(
            `ALTER TABLE "licenses" ADD CONSTRAINT "FK_24121d1ef249fc30026bd4eeca1" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "files" ADD CONSTRAINT "FK_63a9da42666b576b5ea6d53023b" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "users" ADD CONSTRAINT "FK_0d1e90d75674c54f8660c4ed446" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_385fd69aea6abc69c4cfa14cbda" FOREIGN KEY ("cqac_id") REFERENCES "call_quality_assessment_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_b1174aaba2d78e28a39699af0d6" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "pac_connector_grpc_server" ADD CONSTRAINT "FK_8bd40f7eb1ec0776d8d25f710b2" FOREIGN KEY ("clien_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "voip" ADD CONSTRAINT "FK_4f804f3d9f30d21529e86f755e2" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "licenses_products_products" ADD CONSTRAINT "FK_9018ae20d6710e87026e022eb5d" FOREIGN KEY ("licensesId") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "licenses_products_products" ADD CONSTRAINT "FK_e6d6290ddbddd6e485bf73415f1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licenses_products_products" DROP CONSTRAINT "FK_e6d6290ddbddd6e485bf73415f1"`);
        await queryRunner.query(`ALTER TABLE "licenses_products_products" DROP CONSTRAINT "FK_9018ae20d6710e87026e022eb5d"`);
        await queryRunner.query(`ALTER TABLE "voip" DROP CONSTRAINT "FK_4f804f3d9f30d21529e86f755e2"`);
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" DROP CONSTRAINT "FK_8bd40f7eb1ec0776d8d25f710b2"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_b1174aaba2d78e28a39699af0d6"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_385fd69aea6abc69c4cfa14cbda"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_0d1e90d75674c54f8660c4ed446"`);
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_63a9da42666b576b5ea6d53023b"`);
        await queryRunner.query(`ALTER TABLE "licenses" DROP CONSTRAINT "FK_24121d1ef249fc30026bd4eeca1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6d6290ddbddd6e485bf73415f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9018ae20d6710e87026e022eb5"`);
        await queryRunner.query(`DROP TABLE "licenses_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."extensions_context_exten_priority_key"`);
        await queryRunner.query(`DROP INDEX "public"."extensions_pkey"`);
        await queryRunner.query(`DROP TABLE "extensions"`);
        await queryRunner.query(`DROP TABLE "ps_aors"`);
        await queryRunner.query(`DROP TABLE "ps_endpoint_id_ips"`);
        await queryRunner.query(`DROP TABLE "ps_auths"`);
        await queryRunner.query(`DROP TABLE "ps_registrations"`);
        await queryRunner.query(`DROP TABLE "ps_endpoints"`);
        await queryRunner.query(`DROP TABLE "ps_transports"`);
        await queryRunner.query(`DROP TABLE "cdr"`);
        await queryRunner.query(`DROP TABLE "voip"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6436cc6b79593760b9ef921ef1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_368ca99acdbd5502fc08b3f779"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "pac_connector_grpc_server"`);
        await queryRunner.query(`DROP TABLE "call_quality_assessment_statistic"`);
        await queryRunner.query(`DROP TABLE "call_quality_assessment_config"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "files"`);
        await queryRunner.query(`DROP TABLE "licenses"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }
}
