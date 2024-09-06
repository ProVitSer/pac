import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1725647988355 implements MigrationInterface {
    name = 'Pac1725647988355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cdr" ADD "linkedid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cdr" ADD CONSTRAINT "UQ_97e5ce5c236f71481f9fa1aa81c" UNIQUE ("uniqueid")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cdr" DROP CONSTRAINT "UQ_97e5ce5c236f71481f9fa1aa81c"`);
        await queryRunner.query(`ALTER TABLE "cdr" DROP COLUMN "linkedid"`);
    }

}
