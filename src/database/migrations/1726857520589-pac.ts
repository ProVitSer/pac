import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1726857520589 implements MigrationInterface {
    name = 'Pac1726857520589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config" DROP CONSTRAINT "FK_afc8437fc59c60a2e05d46a9d2b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config" ADD CONSTRAINT "FK_afc8437fc59c60a2e05d46a9d2b" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
