import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728311293888 implements MigrationInterface {
    name = 'Pac1728311293888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config" RENAME COLUMN "is_test" TO "token"`);
        await queryRunner.query(`ALTER TABLE "tg_config" RENAME CONSTRAINT "UQ_3be3fb7d1cfbf5814e661a27b4e" TO "UQ_eb6bd53337215117c081489a0cc"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config" RENAME CONSTRAINT "UQ_eb6bd53337215117c081489a0cc" TO "UQ_3be3fb7d1cfbf5814e661a27b4e"`);
        await queryRunner.query(`ALTER TABLE "tg_config" RENAME COLUMN "token" TO "is_test"`);
    }

}
