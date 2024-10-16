import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727525300052 implements MigrationInterface {
    name = 'Pac1727525300052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "crm" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_236b1cacf5ab47e7a197e100947" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "number_region"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "client_company" character varying`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "client_name" character varying`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "country" character varying`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "region" character varying`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "city" character varying`);
        await queryRunner.query(`ALTER TYPE "public"."products_product_type_enum" RENAME TO "products_product_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."products_product_type_enum" AS ENUM('api', 'sms', 'crm-bitrix', 'crm-alfa', 'crm-amocrm', 'crm-custom', 'calling-tts', 'telegram')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" TYPE "public"."products_product_type_enum" USING "product_type"::"text"::"public"."products_product_type_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" SET DEFAULT 'api'`);
        await queryRunner.query(`DROP TYPE "public"."products_product_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."smart_routing_routing_service_enum" RENAME TO "smart_routing_routing_service_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."smart_routing_routing_service_enum" AS ENUM('phonebook', 'crm-bitrix', 'crm-alfa', 'crm-amocrm', 'crm-custom', 'custom')`);
        await queryRunner.query(`ALTER TABLE "smart_routing" ALTER COLUMN "routing_service" TYPE "public"."smart_routing_routing_service_enum" USING "routing_service"::"text"::"public"."smart_routing_routing_service_enum"`);
        await queryRunner.query(`DROP TYPE "public"."smart_routing_routing_service_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."smart_routing_routing_service_enum_old" AS ENUM('phonebook', 'bitrix', 'custom')`);
        await queryRunner.query(`ALTER TABLE "smart_routing" ALTER COLUMN "routing_service" TYPE "public"."smart_routing_routing_service_enum_old" USING "routing_service"::"text"::"public"."smart_routing_routing_service_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."smart_routing_routing_service_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."smart_routing_routing_service_enum_old" RENAME TO "smart_routing_routing_service_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."products_product_type_enum_old" AS ENUM('api', 'sms', 'bitrix', 'alfa', 'amocrm', 'calling-tts', 'telegram')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" TYPE "public"."products_product_type_enum_old" USING "product_type"::"text"::"public"."products_product_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" SET DEFAULT 'api'`);
        await queryRunner.query(`DROP TYPE "public"."products_product_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."products_product_type_enum_old" RENAME TO "products_product_type_enum"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "client_name"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" DROP COLUMN "client_company"`);
        await queryRunner.query(`ALTER TABLE "call_quality_assessment_statistic" ADD "number_region" character varying`);
        await queryRunner.query(`DROP TABLE "crm"`);
    }

}
