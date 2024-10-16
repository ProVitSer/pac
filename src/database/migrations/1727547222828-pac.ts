import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727547222828 implements MigrationInterface {
    name = 'Pac1727547222828'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" DROP CONSTRAINT "UQ_8bd4858d19519c3726fe25bf8aa"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" ADD CONSTRAINT "UQ_8bd4858d19519c3726fe25bf8aa" UNIQUE ("call_id")`);
    }

}
