import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730546506940 implements MigrationInterface {
    name = 'Pac1730546506940'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" ADD CONSTRAINT "UQ_e5a41f7fca1092cdd5018d8914d" UNIQUE ("segment_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pbx_call_statistics" DROP CONSTRAINT "UQ_e5a41f7fca1092cdd5018d8914d"`);
    }

}
