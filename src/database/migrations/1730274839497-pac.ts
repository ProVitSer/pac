import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730274839497 implements MigrationInterface {
    name = 'Pac1730274839497'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_385fd69aea6abc69c4cfa14cbda"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "cqac_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "cqac_id" integer`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_385fd69aea6abc69c4cfa14cbda" FOREIGN KEY ("cqac_id") REFERENCES "call_quality_assessment_config"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
