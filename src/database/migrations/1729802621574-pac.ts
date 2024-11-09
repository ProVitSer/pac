import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729802621574 implements MigrationInterface {
    name = 'Pac1729802621574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" RENAME COLUMN "user_name" TO "tg_user_name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" RENAME COLUMN "tg_user_name" TO "user_name"`);
    }

}
