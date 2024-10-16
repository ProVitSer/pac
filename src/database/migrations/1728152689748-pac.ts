import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728152689748 implements MigrationInterface {
    name = 'Pac1728152689748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stt" ("id" SERIAL NOT NULL, "stt_id" integer NOT NULL, "external_stt_id" character varying NOT NULL, "download_voice_file_id" character varying NOT NULL, "stt_provider_type" "public"."stt_stt_provider_type_enum" NOT NULL, "stt_recognize_status" "public"."stt_stt_recognize_status_enum" NOT NULL, "file_name" character varying NOT NULL, "generated_file_name" character varying NOT NULL, "full_file_path" character varying NOT NULL, "text_dialog" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bb2d86e0ff6749920a96ef0742c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "stt"`);
    }

}
