import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1726246347061 implements MigrationInterface {
    name = 'Pac1726246347061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" DROP CONSTRAINT "FK_746d4d99b0e365f65cea60ec29c"`);
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" ALTER COLUMN "client_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" DROP CONSTRAINT "REL_8bd40f7eb1ec0776d8d25f710b"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" ADD CONSTRAINT "REL_8bd40f7eb1ec0776d8d25f710b" UNIQUE ("client_id")`);
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" ALTER COLUMN "client_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" ADD CONSTRAINT "FK_746d4d99b0e365f65cea60ec29c" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
