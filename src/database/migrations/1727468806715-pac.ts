import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727468806715 implements MigrationInterface {
    name = 'Pac1727468806715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ALTER COLUMN "client_number" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ALTER COLUMN "client_number" SET NOT NULL`);
    }

}
