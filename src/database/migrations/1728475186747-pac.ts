import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728475186747 implements MigrationInterface {
    name = 'Pac1728475186747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_users" DROP COLUMN "pbx_extension"`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD "pbx_extension" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD CONSTRAINT "UQ_5828c626776d5ad05338fd95c81" UNIQUE ("pbx_extension")`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD CONSTRAINT "UQ_262ba6921c67016aac3ec553398" UNIQUE ("crm_user_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "crm_users" DROP CONSTRAINT "UQ_262ba6921c67016aac3ec553398"`);
        await queryRunner.query(`ALTER TABLE "crm_users" DROP CONSTRAINT "UQ_5828c626776d5ad05338fd95c81"`);
        await queryRunner.query(`ALTER TABLE "crm_users" DROP COLUMN "pbx_extension"`);
        await queryRunner.query(`ALTER TABLE "crm_users" ADD "pbx_extension" character varying NOT NULL`);
    }

}
