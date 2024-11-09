import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728238907790 implements MigrationInterface {
    name = 'Pac1728238907790'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "sender" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "sender" SET NOT NULL`);
    }

}
