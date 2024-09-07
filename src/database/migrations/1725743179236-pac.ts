import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1725743179236 implements MigrationInterface {
    name = 'Pac1725743179236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."voip_trunk_status_enum" AS ENUM('Registered', 'Unregistered', 'Rejected', 'Failed')`);
        await queryRunner.query(`ALTER TABLE "voip" ADD "trunk_status" "public"."voip_trunk_status_enum" NOT NULL DEFAULT 'Unregistered'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "voip" DROP COLUMN "trunk_status"`);
        await queryRunner.query(`DROP TYPE "public"."voip_trunk_status_enum"`);
    }

}
