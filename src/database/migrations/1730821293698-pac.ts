import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730821293698 implements MigrationInterface {
    name = 'Pac1730821293698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stt" ADD "application_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stt" ADD CONSTRAINT "UQ_40153a955ff0e181cc3ccd8468f" UNIQUE ("application_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stt" DROP CONSTRAINT "UQ_40153a955ff0e181cc3ccd8468f"`);
        await queryRunner.query(`ALTER TABLE "stt" DROP COLUMN "application_id"`);
    }

}
