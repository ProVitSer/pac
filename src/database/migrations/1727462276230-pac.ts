import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1727462276230 implements MigrationInterface {
    name = 'Pac1727462276230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smart_routing" ADD CONSTRAINT "UQ_934945bf0c0b5eaaece201c7fa1" UNIQUE ("pbx_extension")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "smart_routing" DROP CONSTRAINT "UQ_934945bf0c0b5eaaece201c7fa1"`);
    }

}
