import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727547397295 implements MigrationInterface {
    name = 'Pac1727547397295'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" ALTER COLUMN "call_type" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "call_event_handler" ALTER COLUMN "call_type" DROP NOT NULL`);
    }

}
