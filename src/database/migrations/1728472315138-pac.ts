import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728472315138 implements MigrationInterface {
    name = 'Pac1728472315138'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crm_config" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "admin_id" integer NOT NULL, "user_task_id" integer NOT NULL, "task_group" integer NOT NULL, "daedline_min" integer, "domain" character varying NOT NULL, "hash" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c3c6688da4c9f65aa9476ea51b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "crm_users" ("id" SERIAL NOT NULL, "pbx_extension" character varying NOT NULL, "crm_user_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_95d94b1acffa50c5cbd200f3650" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "crm_users"`);
        await queryRunner.query(`DROP TABLE "crm_config"`);
    }

}
