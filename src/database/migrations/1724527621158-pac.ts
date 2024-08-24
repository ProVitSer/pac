import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1724527621158 implements MigrationInterface {
    name = 'Pac1724527621158';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "product" ("id" SERIAL NOT NULL, "product_type" "public"."product_product_type_enum" NOT NULL DEFAULT 'api', "description" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_faccedc2e7ebc0b5796a1c29db6" UNIQUE ("product_type"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "client" ("id" SERIAL NOT NULL, "client_id" integer NOT NULL, "company_name" character varying NOT NULL, "contact_person_name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "buh_id" character varying, "balance" integer NOT NULL DEFAULT '0', "deleted" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49" UNIQUE ("client_id"), CONSTRAINT "UQ_368ca99acdbd5502fc08b3f7796" UNIQUE ("phone"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_368ca99acdbd5502fc08b3f779" ON "client" ("phone") `);
        await queryRunner.query(`CREATE INDEX "IDX_6436cc6b79593760b9ef921ef1" ON "client" ("email") `);
        await queryRunner.query(
            `CREATE TABLE "licenses" ("id" SERIAL NOT NULL, "license" character varying NOT NULL, "expiration_date" TIMESTAMP NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "is_test" boolean NOT NULL DEFAULT true, "order" TIMESTAMP, "activate" TIMESTAMP, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "clientId" integer, CONSTRAINT "UQ_13c7c21631ba7ab257d9e425381" UNIQUE ("license"), CONSTRAINT "REL_35e7497ac54e308b553bf35e94" UNIQUE ("clientId"), CONSTRAINT "PK_da5021501ce80efa03de6f40086" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "licenses_products_product" ("licensesId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_0292a25d4e9abaf7039f3a9777d" PRIMARY KEY ("licensesId", "productId"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_68f5f42d310433ebf5c70ed013" ON "licenses_products_product" ("licensesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_59ff2f6460bc1513a0aee97a5e" ON "licenses_products_product" ("productId") `);
        await queryRunner.query(
            `ALTER TABLE "licenses" ADD CONSTRAINT "FK_35e7497ac54e308b553bf35e94a" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "licenses_products_product" ADD CONSTRAINT "FK_68f5f42d310433ebf5c70ed0134" FOREIGN KEY ("licensesId") REFERENCES "licenses"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "licenses_products_product" ADD CONSTRAINT "FK_59ff2f6460bc1513a0aee97a5e8" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "licenses_products_product" DROP CONSTRAINT "FK_59ff2f6460bc1513a0aee97a5e8"`);
        await queryRunner.query(`ALTER TABLE "licenses_products_product" DROP CONSTRAINT "FK_68f5f42d310433ebf5c70ed0134"`);
        await queryRunner.query(`ALTER TABLE "licenses" DROP CONSTRAINT "FK_35e7497ac54e308b553bf35e94a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_59ff2f6460bc1513a0aee97a5e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_68f5f42d310433ebf5c70ed013"`);
        await queryRunner.query(`DROP TABLE "licenses_products_product"`);
        await queryRunner.query(`DROP TABLE "licenses"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6436cc6b79593760b9ef921ef1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_368ca99acdbd5502fc08b3f779"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "product"`);
    }
}
