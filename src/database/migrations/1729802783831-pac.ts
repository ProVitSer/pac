import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729802783831 implements MigrationInterface {
    name = 'Pac1729802783831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" ADD CONSTRAINT "UQ_c1a74f39abaec5de0586581dc9f" UNIQUE ("tg_user_name")`);
        await queryRunner.query(`ALTER TABLE "tg_users" ADD CONSTRAINT "UQ_080dc6e3cc86d15c748d1088c5a" UNIQUE ("extension")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" DROP CONSTRAINT "UQ_080dc6e3cc86d15c748d1088c5a"`);
        await queryRunner.query(`ALTER TABLE "tg_users" DROP CONSTRAINT "UQ_c1a74f39abaec5de0586581dc9f"`);
    }

}
