import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1724271307528 implements MigrationInterface {
    name = 'Pac1724271307528';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "client" ("id" SERIAL NOT NULL, "client_id" character varying NOT NULL, "company_name" character varying NOT NULL, "contact_person_name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "buh_id" character varying, "balance" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_7510ce0a84bde51dbff978b4b49" UNIQUE ("client_id"), CONSTRAINT "UQ_6436cc6b79593760b9ef921ef12" UNIQUE ("email"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "license" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "expiration_date" TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "license" ADD CONSTRAINT "FK_cf5e33aefa601a28718624698a7" FOREIGN KEY ("companyId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_cf5e33aefa601a28718624698a7"`);
        await queryRunner.query(`DROP TABLE "license"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }
}
