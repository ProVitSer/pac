import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728664822120 implements MigrationInterface {
    name = 'Pac1728664822120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smart_routing" ADD "ai_routing" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "smart_routing" ADD "default_routing_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smart_routing" DROP COLUMN "default_routing_number"`);
        await queryRunner.query(`ALTER TABLE "smart_routing" DROP COLUMN "ai_routing"`);
    }

}
