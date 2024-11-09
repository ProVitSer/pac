import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730556045009 implements MigrationInterface {
    name = 'Pac1730556045009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extension_analitics" DROP COLUMN "call_talking_dur"`);
        await queryRunner.query(`ALTER TABLE "extension_analitics" ADD "call_talking_dur" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "extension_analitics" DROP COLUMN "call_talking_dur"`);
        await queryRunner.query(`ALTER TABLE "extension_analitics" ADD "call_talking_dur" character varying NOT NULL`);
    }

}
