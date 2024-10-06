import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728237529366 implements MigrationInterface {
    name = 'Pac1728237529366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."sms_sms_send_status_enum" AS ENUM('apiFail', 'error', 'inProgress', 'completed', 'cancel')`);
        await queryRunner.query(`CREATE TABLE "sms" ("id" SERIAL NOT NULL, "smsId" character varying NOT NULL, "number" character varying NOT NULL, "sms_text" character varying NOT NULL, "sender" character varying NOT NULL, "client_id" integer NOT NULL, "sms_send_status" "public"."sms_sms_send_status_enum" NOT NULL, "sms_send_result" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_60793c2f16aafe0513f8817eae8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sms_config" ("id" SERIAL NOT NULL, "psw" character varying NOT NULL, "login" character varying NOT NULL, "sender" character varying NOT NULL DEFAULT 'default', "client_id" integer NOT NULL, "deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5747a22aa47df1c51d160d902b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "sms_config"`);
        await queryRunner.query(`DROP TABLE "sms"`);
        await queryRunner.query(`DROP TYPE "public"."sms_sms_send_status_enum"`);
    }

}
