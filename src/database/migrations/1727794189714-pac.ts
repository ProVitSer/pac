import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727794189714 implements MigrationInterface {
    name = 'Pac1727794189714'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tg_messages" ("id" SERIAL NOT NULL, "message_id" character varying NOT NULL, "message" character varying NOT NULL, "tg_config_id" integer, "tg_user_id" integer, "client_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_86e8b246db58ef039b52bccd673" UNIQUE ("message_id"), CONSTRAINT "PK_328dacf9f7956030249e97a8f73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tg_users" ADD "deleted" boolean`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" DROP COLUMN "deleted"`);
        await queryRunner.query(`DROP TABLE "tg_messages"`);
    }

}
