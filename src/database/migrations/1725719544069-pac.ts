import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1725719544069 implements MigrationInterface {
    name = 'Pac1725719544069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_product_type_enum" AS ENUM('api', 'sms', 'bitrix', 'alfa', 'amocrm', 'calling-tts', 'telegram')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "product_type" "public"."products_product_type_enum" NOT NULL DEFAULT 'api', "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a89bd51c8d5b29c8b344da255c3" UNIQUE ("product_type"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "licenses_products_products" ("licensesId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_9535467a7c10ec8d88011ec0150" PRIMARY KEY ("licensesId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9018ae20d6710e87026e022eb5" ON "licenses_products_products" ("licensesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e6d6290ddbddd6e485bf73415f" ON "licenses_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "licenses_products_products" ADD CONSTRAINT "FK_9018ae20d6710e87026e022eb5d" FOREIGN KEY ("licensesId") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "licenses_products_products" ADD CONSTRAINT "FK_e6d6290ddbddd6e485bf73415f1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licenses_products_products" DROP CONSTRAINT "FK_e6d6290ddbddd6e485bf73415f1"`);
        await queryRunner.query(`ALTER TABLE "licenses_products_products" DROP CONSTRAINT "FK_9018ae20d6710e87026e022eb5d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e6d6290ddbddd6e485bf73415f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9018ae20d6710e87026e022eb5"`);
        await queryRunner.query(`DROP TABLE "licenses_products_products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_product_type_enum"`);
    }

}
