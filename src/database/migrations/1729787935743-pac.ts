import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729787935743 implements MigrationInterface {
    name = 'Pac1729787935743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" DROP COLUMN "name"`);
    }

}
