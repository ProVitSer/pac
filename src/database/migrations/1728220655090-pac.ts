import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728220655090 implements MigrationInterface {
    name = 'Pac1728220655090'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stt" ADD "original_provicer_recognize" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stt" DROP COLUMN "original_provicer_recognize"`);
    }

}
