import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729327759191 implements MigrationInterface {
    name = 'Pac1729327759191'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying NOT NULL`);
    }

}
