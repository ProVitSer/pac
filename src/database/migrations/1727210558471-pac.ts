import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727210558471 implements MigrationInterface {
    name = 'Pac1727210558471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."smart_routing_users_routing_service_enum" AS ENUM('phonebook', 'bitrix', 'custom')`);
        await queryRunner.query(`CREATE TABLE "smart_routing_users" ("id" SERIAL NOT NULL, "pbx_extension" character varying NOT NULL, "routing_service" "public"."smart_routing_users_routing_service_enum" NOT NULL, "client_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c2bfb09f5ec318ec1b4fc736e7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "smart_routing_users"`);
        await queryRunner.query(`DROP TYPE "public"."smart_routing_users_routing_service_enum"`);
    }

}
