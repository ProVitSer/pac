import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1726245964970 implements MigrationInterface {
    name = 'Pac1726245964970';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" DROP CONSTRAINT "FK_8bd40f7eb1ec0776d8d25f710b2"`);
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" RENAME COLUMN "clien_id" TO "client_id"`);
        await queryRunner.query(
            `ALTER TABLE "pac_connector_grpc_server" ADD CONSTRAINT "FK_746d4d99b0e365f65cea60ec29c" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" DROP CONSTRAINT "FK_746d4d99b0e365f65cea60ec29c"`);
        await queryRunner.query(`ALTER TABLE "pac_connector_grpc_server" RENAME COLUMN "client_id" TO "clien_id"`);
        await queryRunner.query(
            `ALTER TABLE "pac_connector_grpc_server" ADD CONSTRAINT "FK_8bd40f7eb1ec0776d8d25f710b2" FOREIGN KEY ("clien_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
