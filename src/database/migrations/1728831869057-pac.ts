import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728831869057 implements MigrationInterface {
    name = 'Pac1728831869057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."products_product_type_enum" RENAME TO "products_product_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."products_product_type_enum" AS ENUM('api', 'sms', 'crm-bitrix', 'crm-alfa', 'crm-amocrm', 'crm-custom', 'calling-tts', 'telegram', 'smart-routing', 'tts', 'stt', 'analitic', 'cqa')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" TYPE "public"."products_product_type_enum" USING "product_type"::"text"::"public"."products_product_type_enum"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" SET DEFAULT 'analitic'`);
        await queryRunner.query(`DROP TYPE "public"."products_product_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" SET DEFAULT '{Read,Create,Update,Delete}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "permissions" SET DEFAULT '{Read}'`);
        await queryRunner.query(`CREATE TYPE "public"."products_product_type_enum_old" AS ENUM('api', 'sms', 'crm-bitrix', 'crm-alfa', 'crm-amocrm', 'crm-custom', 'calling-tts', 'telegram', 'smart-routing', 'tts', 'stt')`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" TYPE "public"."products_product_type_enum_old" USING "product_type"::"text"::"public"."products_product_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "products" ALTER COLUMN "product_type" SET DEFAULT 'api'`);
        await queryRunner.query(`DROP TYPE "public"."products_product_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."products_product_type_enum_old" RENAME TO "products_product_type_enum"`);
    }

}
