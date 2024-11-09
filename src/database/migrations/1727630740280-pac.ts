import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727630740280 implements MigrationInterface {
    name = 'Pac1727630740280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."missed_call_missed_service_type_enum" AS ENUM('tg', 'crm', 'sms')`);
        await queryRunner.query(`CREATE TABLE "missed_call" ("id" SERIAL NOT NULL, "trunk_name" character varying, "missed_service_type" "public"."missed_call_missed_service_type_enum" array, "client_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_40eb3598c914b6ee93c3be03cab" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "missed_call"`);
        await queryRunner.query(`DROP TYPE "public"."missed_call_missed_service_type_enum"`);
    }

}
