import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1725717814312 implements MigrationInterface {
    name = 'Pac1725717814312'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_6c3a73bbc9d8a8082816adc870e" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6c3a73bbc9d8a8082816adc870e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_6c3a73bbc9d8a8082816adc870e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "clientId"`);
    }

}
