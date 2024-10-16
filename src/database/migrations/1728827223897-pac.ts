import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728827223897 implements MigrationInterface {
    name = 'Pac1728827223897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "validation_token" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "validation_token"`);
    }

}
