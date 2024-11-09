import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729841331351 implements MigrationInterface {
    name = 'Pac1729841331351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" ADD "client_id" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" DROP COLUMN "client_id"`);
    }

}
