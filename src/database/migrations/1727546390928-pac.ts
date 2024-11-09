import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727546390928 implements MigrationInterface {
    name = 'Pac1727546390928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."call_event_handler_call_type_enum" AS ENUM('incoming', 'outgoung', 'local', 'unknown')`);
        await queryRunner.query(`CREATE TYPE "public"."call_event_handler_call_process_enum" AS ENUM('callInProcess', 'callConnected', 'callEnd', 'callError')`);
        await queryRunner.query(`CREATE TABLE "call_event_handler" ("id" SERIAL NOT NULL, "call_id" character varying, "call_history_id" character varying NOT NULL, "call_type" "public"."call_event_handler_call_type_enum", "call_process" "public"."call_event_handler_call_process_enum" NOT NULL DEFAULT 'callInProcess', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_8bd4858d19519c3726fe25bf8aa" UNIQUE ("call_id"), CONSTRAINT "UQ_549c6ffd21d7ed442fcd994cb69" UNIQUE ("call_history_id"), CONSTRAINT "PK_1b2ab2802dd8666fca72c3038df" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "call_event_handler"`);
        await queryRunner.query(`DROP TYPE "public"."call_event_handler_call_process_enum"`);
        await queryRunner.query(`DROP TYPE "public"."call_event_handler_call_type_enum"`);
    }

}
