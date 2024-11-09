import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727719399961 implements MigrationInterface {
    name = 'Pac1727719399961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" ADD "original_full_call_info" json`);
        await queryRunner.query(`ALTER TABLE "call_event_handler" ADD "full_call_info" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" DROP COLUMN "full_call_info"`);
        await queryRunner.query(`ALTER TABLE "call_event_handler" DROP COLUMN "original_full_call_info"`);
    }

}
