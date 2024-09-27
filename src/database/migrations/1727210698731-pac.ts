import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1727210698731 implements MigrationInterface {
    name = 'Pac1727210698731';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."smart_routing_routing_service_enum" AS ENUM('phonebook', 'bitrix', 'custom')`);
        await queryRunner.query(
            `CREATE TABLE "smart_routing" ("id" SERIAL NOT NULL, "pbx_extension" character varying NOT NULL, "routing_service" "public"."smart_routing_routing_service_enum" NOT NULL, "client_id" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_62b0e3f7e62bda031fb61cf7c94" PRIMARY KEY ("id"))`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "smart_routing"`);
        await queryRunner.query(`DROP TYPE "public"."smart_routing_routing_service_enum"`);
    }
}
