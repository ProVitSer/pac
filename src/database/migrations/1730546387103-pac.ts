import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730546387103 implements MigrationInterface {
    name = 'Pac1730546387103'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" DROP COLUMN "source_dn"`);
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" ADD "source_dn" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" DROP COLUMN "segment_id"`);
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" ADD "segment_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" DROP COLUMN "segment_id"`);
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" ADD "segment_id" character varying DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" DROP COLUMN "source_dn"`);
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" ADD "source_dn" integer DEFAULT '0'`);
    }

}
