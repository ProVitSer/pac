import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1725024730670 implements MigrationInterface {
    name = 'Pac1725024730670';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_permissions_enum" AS ENUM('DeletePost', 'CreateCategory')`);
        await queryRunner.query(`CREATE TYPE "public"."users_roles_enum" AS ENUM('User', 'Admin')`);
        await queryRunner.query(
            `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone_number" character varying, "name" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "latest_activity" TIMESTAMP, "registered_date" TIMESTAMP NOT NULL, "permissions" "public"."users_permissions_enum" array NOT NULL DEFAULT '{}', "roles" "public"."users_roles_enum" array NOT NULL DEFAULT '{User}', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_roles_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_permissions_enum"`);
    }
}
