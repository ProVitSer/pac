import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1726778855893 implements MigrationInterface {
    name = 'Pac1726778855893'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "externalCallId" character varying`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "UQ_14e480097dc8e35c499cca8a62d" UNIQUE ("externalCallId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "UQ_14e480097dc8e35c499cca8a62d"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "externalCallId"`);
    }

}
