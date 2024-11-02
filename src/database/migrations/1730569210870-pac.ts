import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730569210870 implements MigrationInterface {
    name = 'Pac1730569210870'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hourly_analitics" ("id" SERIAL NOT NULL, "report_date" date NOT NULL, "report_hour" integer NOT NULL, "call_ids" integer array NOT NULL, "data" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_11323cc05a0f07cfcdd5b065f76" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hourly_analitics"`);
    }

}
