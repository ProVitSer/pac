import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1724100992866 implements MigrationInterface {
    name = 'Migrations1724100992866';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "contact_person_name" character varying NOT NULL, "contact_info" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "license" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "expiration_date" TIMESTAMP, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "companyId" integer, CONSTRAINT "PK_f168ac1ca5ba87286d03b2ef905" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `ALTER TABLE "license" ADD CONSTRAINT "FK_cf5e33aefa601a28718624698a7" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_cf5e33aefa601a28718624698a7"`);
        await queryRunner.query(`DROP TABLE "license"`);
        await queryRunner.query(`DROP TABLE "company"`);
    }
}
