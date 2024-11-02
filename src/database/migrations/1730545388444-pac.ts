import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730545388444 implements MigrationInterface {
    name = 'Pac1730545388444'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pbx_call_statistics_call_type_enum" AS ENUM('incoming', 'outgoing', 'local', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "pbx_call_statistics" ("id" SERIAL NOT NULL, "call_id" integer NOT NULL, "call_type" "public"."pbx_call_statistics_call_type_enum" NOT NULL, "answered" boolean, "destination_caller_id" character varying DEFAULT '', "destination_display_name" character varying DEFAULT '', "destination_dn" character varying DEFAULT '', "reason" character varying DEFAULT '', "ringing_duration" character varying DEFAULT '', "source_caller_id" character varying DEFAULT '', "source_display_name" character varying DEFAULT '', "source_dn" integer DEFAULT '0', "start_time" character varying DEFAULT '', "talking_duration" character varying DEFAULT '', "recording_url" character varying DEFAULT '', "segment_id" character varying DEFAULT '', "country" character varying DEFAULT '', "region" character varying DEFAULT '', "city" character varying DEFAULT '', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_660352863c62ccd905f592bd248" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pbx_call_statistics"`);
        await queryRunner.query(`DROP TYPE "public"."pbx_call_statistics_call_type_enum"`);
    }

}
