import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728206895029 implements MigrationInterface {
    name = 'Pac1728206895029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."stt_stt_provider_type_enum" RENAME TO "stt_stt_provider_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."stt_stt_provider_type_enum" AS ENUM('yandex', 'sber')`);
        await queryRunner.query(`ALTER TABLE "stt" ALTER COLUMN "stt_provider_type" TYPE "public"."stt_stt_provider_type_enum" USING "stt_provider_type"::"text"::"public"."stt_stt_provider_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."stt_stt_provider_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."stt_stt_provider_type_enum_old" AS ENUM('sber')`);
        await queryRunner.query(`ALTER TABLE "stt" ALTER COLUMN "stt_provider_type" TYPE "public"."stt_stt_provider_type_enum_old" USING "stt_provider_type"::"text"::"public"."stt_stt_provider_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."stt_stt_provider_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."stt_stt_provider_type_enum_old" RENAME TO "stt_stt_provider_type_enum"`);
    }

}
