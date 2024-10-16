import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727791425951 implements MigrationInterface {
    name = 'Pac1727791425951'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" DROP CONSTRAINT "FK_63a9da42666b576b5ea6d53023b"`);
        await queryRunner.query(`ALTER TABLE "files" RENAME COLUMN "clientId" TO "client_id"`);
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "client_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "files" ALTER COLUMN "client_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "files" RENAME COLUMN "client_id" TO "clientId"`);
        await queryRunner.query(`ALTER TABLE "files" ADD CONSTRAINT "FK_63a9da42666b576b5ea6d53023b" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
