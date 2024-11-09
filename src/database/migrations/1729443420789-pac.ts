import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729443420789 implements MigrationInterface {
    name = 'Pac1729443420789'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_notifications_type_enum" AS ENUM('alert', 'report', 'custom')`);
        await queryRunner.query(`CREATE TYPE "public"."users_notifications_avatar_type_enum" AS ENUM('icon', 'img', 'name')`);
        await queryRunner.query(`CREATE TABLE "users_notifications" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "type" "public"."users_notifications_type_enum" NOT NULL, "avatar_type" "public"."users_notifications_avatar_type_enum" NOT NULL, "icon" character varying, "img" character varying, "small_title" character varying, "full_title" character varying NOT NULL, "small_text" character varying NOT NULL, "html" character varying NOT NULL, "link" character varying, "is_read" boolean NOT NULL DEFAULT false, "author" json, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e2f7e4c458e3bc2bf04fc057863" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_notifications"`);
        await queryRunner.query(`DROP TYPE "public"."users_notifications_avatar_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_notifications_type_enum"`);
    }

}
