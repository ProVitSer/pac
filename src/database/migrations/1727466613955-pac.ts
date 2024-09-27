import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727466613955 implements MigrationInterface {
    name = 'Pac1727466613955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_b1174aaba2d78e28a39699af0d6"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ALTER COLUMN "client_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ALTER COLUMN "client_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_b1174aaba2d78e28a39699af0d6" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
