import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1725647851336 implements MigrationInterface {
    name = 'Pac1725647851336'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cdr" ("id" SERIAL NOT NULL, "calldate" TIMESTAMP NOT NULL, "clid" character varying NOT NULL, "src" character varying NOT NULL, "dst" character varying NOT NULL, "dcontext" character varying NOT NULL, "channel" character varying NOT NULL, "dstchannel" character varying NOT NULL, "lastapp" character varying, "lastdata" character varying, "duration" integer, "billsec" integer NOT NULL, "disposition" character varying NOT NULL, "amaflags" integer, "accountcode" character varying NOT NULL, "uniqueid" character varying NOT NULL, "userfield" character varying, "client_id" character varying NOT NULL, "trunk_type" character varying NOT NULL, CONSTRAINT "PK_0d5afbe6ea3365788ca99fa9a8c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cdr"`);
    }

}
