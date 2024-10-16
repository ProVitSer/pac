import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727461651741 implements MigrationInterface {
    name = 'Pac1727461651741'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smart_routing" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smart_routing" DROP COLUMN "name"`);
    }

}
