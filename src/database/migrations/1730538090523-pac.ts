import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1730538090523 implements MigrationInterface {
    name = 'Pac1730538090523'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "extension_analitics" ("id" SERIAL NOT NULL, "extension" character varying NOT NULL, "display_name" character varying NOT NULL, "inbound_answered_count" integer NOT NULL, "inbound_unanswered_count" integer NOT NULL, "outbound_call_count" integer NOT NULL, "call_talking_dur" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ff557cb0be4fb263b7c0137a1aa" UNIQUE ("extension"), CONSTRAINT "PK_5e1aad42c3ff4c54db4298a5244" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "extension_analitics"`);
    }

}
