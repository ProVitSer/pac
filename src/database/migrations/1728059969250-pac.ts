import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728059969250 implements MigrationInterface {
    name = 'Pac1728059969250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tts_tts_provider_type_enum" AS ENUM('tinkoff', 'sber')`);
        await queryRunner.query(`CREATE TABLE "tts" ("id" SERIAL NOT NULL, "tts_id" integer NOT NULL, "tts_provider_type" "public"."tts_tts_provider_type_enum" NOT NULL, "file_name" character varying NOT NULL, "generated_file_name" character varying NOT NULL, "full_file_path" character varying NOT NULL, "text" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_55c75cce0fd5ff4fb58aa85c546" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tts"`);
        await queryRunner.query(`DROP TYPE "public"."tts_tts_provider_type_enum"`);
    }

}
