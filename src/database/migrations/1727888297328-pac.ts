import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727888297328 implements MigrationInterface {
    name = 'Pac1727888297328'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."call_event_handler_call_type_enum" AS ENUM('incoming', 'outgoing', 'local', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "call_event_handler" ("id" SERIAL NOT NULL, "call_id" character varying, "call_history_id" character varying NOT NULL, "call_type" "public"."call_event_handler_call_type_enum" NOT NULL, "call_process" "public"."call_event_handler_call_process_enum" NOT NULL DEFAULT 'callInProcess', "original_full_call_info" json, "full_call_info" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_549c6ffd21d7ed442fcd994cb69" UNIQUE ("call_history_id"), CONSTRAINT "PK_1b2ab2802dd8666fca72c3038df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."call_analytics_call_type_enum" AS ENUM('incoming', 'outgoing', 'local', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "call_analytics" ("id" SERIAL NOT NULL, "call_id" integer NOT NULL, "client_id" integer NOT NULL, "call_type" "public"."call_analytics_call_type_enum" NOT NULL, "client_company" character varying DEFAULT '', "country" character varying DEFAULT '', "region" character varying DEFAULT '', "city" character varying DEFAULT '', "src_display_name" character varying DEFAULT '', "src_caller_number" character varying DEFAULT '', "src_dn" character varying DEFAULT '', "dst_extended_display_name" character varying DEFAULT '', "dst_display_name" character varying DEFAULT '', "dst_dn" character varying DEFAULT '', "dst_caller_number" character varying DEFAULT '', "call_time" integer DEFAULT '0', "dst_recording_url" character varying DEFAULT '', "operator_name" character varying DEFAULT '', "start_time" character varying DEFAULT '', "end_time" character varying DEFAULT '', "call_answered" boolean, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e6de2e43fa9c5396ba1c2aa9d4" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "call_analytics"`);
        await queryRunner.query(`DROP TYPE "public"."call_analytics_call_type_enum"`);
        await queryRunner.query(`DROP TABLE "call_event_handler"`);
        await queryRunner.query(`DROP TYPE "public"."call_event_handler_call_type_enum"`);
    }

}
