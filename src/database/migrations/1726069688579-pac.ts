import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1726069688579 implements MigrationInterface {
    name = 'Pac1726069688579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_dcc6f61d4c4db67c999c8866160"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_f175b759774959ae295f741aa6e"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "callQualityAssessmentConfigId"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "cqac_id" integer`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "client_id" integer`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_385fd69aea6abc69c4cfa14cbda" FOREIGN KEY ("cqac_id") REFERENCES "call_quality_assessment_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_b1174aaba2d78e28a39699af0d6" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_b1174aaba2d78e28a39699af0d6"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_385fd69aea6abc69c4cfa14cbda"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "cqac_id"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "callQualityAssessmentConfigId" integer`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_f175b759774959ae295f741aa6e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_dcc6f61d4c4db67c999c8866160" FOREIGN KEY ("callQualityAssessmentConfigId") REFERENCES "call_quality_assessment_config"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
