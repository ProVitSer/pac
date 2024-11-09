import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730623724622 implements MigrationInterface {
    name = 'Pac1730623724622'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "daily_analitics" ("id" SERIAL NOT NULL, "report_date" date NOT NULL, "data" json NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8b8ffc98a4c8c95a3ca8c243448" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "daily_analitics"`);
    }

}
