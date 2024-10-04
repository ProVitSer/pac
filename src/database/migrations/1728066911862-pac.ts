import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728066911862 implements MigrationInterface {
    name = 'Pac1728066911862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."tts_tts_provider_type_enum" RENAME TO "tts_tts_provider_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."tts_tts_provider_type_enum" AS ENUM('yandex', 'tinkoff', 'sber')`);
        await queryRunner.query(`ALTER TABLE "tts" ALTER COLUMN "tts_provider_type" TYPE "public"."tts_tts_provider_type_enum" USING "tts_provider_type"::"text"::"public"."tts_tts_provider_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tts_tts_provider_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tts_tts_provider_type_enum_old" AS ENUM('tinkoff', 'sber')`);
        await queryRunner.query(`ALTER TABLE "tts" ALTER COLUMN "tts_provider_type" TYPE "public"."tts_tts_provider_type_enum_old" USING "tts_provider_type"::"text"::"public"."tts_tts_provider_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."tts_tts_provider_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."tts_tts_provider_type_enum_old" RENAME TO "tts_tts_provider_type_enum"`);
    }

}
