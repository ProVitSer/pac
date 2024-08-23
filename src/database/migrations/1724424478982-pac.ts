import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1724424478982 implements MigrationInterface {
    name = 'Pac1724424478982';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" ADD "companyId" integer`);
        await queryRunner.query(`ALTER TABLE "license" ADD CONSTRAINT "UQ_cf5e33aefa601a28718624698a7" UNIQUE ("companyId")`);
        await queryRunner.query(
            `ALTER TABLE "license" ADD CONSTRAINT "FK_cf5e33aefa601a28718624698a7" FOREIGN KEY ("companyId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "FK_cf5e33aefa601a28718624698a7"`);
        await queryRunner.query(`ALTER TABLE "license" DROP CONSTRAINT "UQ_cf5e33aefa601a28718624698a7"`);
        await queryRunner.query(`ALTER TABLE "license" DROP COLUMN "companyId"`);
    }
}
