import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729443577739 implements MigrationInterface {
    name = 'Pac1729443577739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notifications" DROP COLUMN "client_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_notifications" ADD "client_id" integer NOT NULL`);
    }

}
