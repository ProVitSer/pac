import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729447058937 implements MigrationInterface {
    name = 'Pac1729447058937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notifications" ADD "deleted" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notifications" DROP COLUMN "deleted"`);
    }

}
