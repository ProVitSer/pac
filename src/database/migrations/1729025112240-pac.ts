import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729025112240 implements MigrationInterface {
    name = 'Pac1729025112240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" ADD "original_call_history_id" character varying`);
        await queryRunner.query(`ALTER TABLE "call_event_handler" ADD CONSTRAINT "UQ_58fda11dd1dcd89a701ebfa5a90" UNIQUE ("original_call_history_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" DROP CONSTRAINT "UQ_58fda11dd1dcd89a701ebfa5a90"`);
        await queryRunner.query(`ALTER TABLE "call_event_handler" DROP COLUMN "original_call_history_id"`);
    }

}
