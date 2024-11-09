import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1726854834445 implements MigrationInterface {
    name = 'Pac1726854834445';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config" DROP COLUMN "message"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config" ADD "message" character varying`);
    }
}
