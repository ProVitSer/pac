import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728153413778 implements MigrationInterface {
    name = 'Pac1728153413778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stt" ALTER COLUMN "external_stt_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stt" ALTER COLUMN "download_voice_file_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stt" ALTER COLUMN "download_voice_file_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stt" ALTER COLUMN "external_stt_id" SET NOT NULL`);
    }

}
