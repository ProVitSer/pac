import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729801977899 implements MigrationInterface {
    name = 'Pac1729801977899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" ALTER COLUMN "deleted" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_users" ALTER COLUMN "deleted" DROP DEFAULT`);
    }

}
