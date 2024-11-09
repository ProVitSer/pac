import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729966086692 implements MigrationInterface {
    name = 'Pac1729966086692'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_config" RENAME COLUMN "daedline_min" TO "deadline_min"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_config" RENAME COLUMN "deadline_min" TO "daedline_min"`);
    }

}
