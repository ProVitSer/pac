import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1724275972047 implements MigrationInterface {
    name = 'Pac1724275972047';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "client_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49" UNIQUE ("client_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "client_id"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "client_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49" UNIQUE ("client_id")`);
    }
}
