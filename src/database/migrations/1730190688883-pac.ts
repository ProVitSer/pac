import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730190688883 implements MigrationInterface {
    name = 'Pac1730190688883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tts" ADD "name" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tts" DROP COLUMN "name"`);
    }

}
