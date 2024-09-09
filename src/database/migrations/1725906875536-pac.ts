import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1725906875536 implements MigrationInterface {
    name = 'Pac1725906875536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "call_quality_assessment_config" ("id" SERIAL NOT NULL, "audio_files" text, "voi_trunk_id" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3aed85bc183a024f6fac521608a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."call_quality_assessment_statistic_call_result_enum" AS ENUM('successful', 'unsuccessful', 'unknown')`);
        await queryRunner.query(`CREATE TABLE "call_quality_assessment_statistic" ("id" SERIAL NOT NULL, "rating" integer NOT NULL DEFAULT '0', "client_number" character varying NOT NULL, "number_region" character varying, "manager_data" character varying, "manager_number" character varying, "call_result" "public"."call_quality_assessment_statistic_call_result_enum" NOT NULL DEFAULT 'unknown', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "callQualityAssessmentConfigId" integer, "clientId" integer, CONSTRAINT "PK_811cf87198676ba08d8bc2d2e79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_dcc6f61d4c4db67c999c8866160" FOREIGN KEY ("callQualityAssessmentConfigId") REFERENCES "call_quality_assessment_config"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD CONSTRAINT "FK_f175b759774959ae295f741aa6e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_f175b759774959ae295f741aa6e"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP CONSTRAINT "FK_dcc6f61d4c4db67c999c8866160"`);
        await queryRunner.query(`DROP TABLE "call_quality_assessment_statistic"`);
        await queryRunner.query(`DROP TYPE "public"."call_quality_assessment_statistic_call_result_enum"`);
        await queryRunner.query(`DROP TABLE "call_quality_assessment_config"`);
    }

}
