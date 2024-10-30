import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730278099251 implements MigrationInterface {
    name = 'Pac1730278099251'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_config" ADD "ai_enabled" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_config" DROP COLUMN "ai_enabled"`);
    }

}
