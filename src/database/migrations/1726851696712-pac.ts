import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1726851696712 implements MigrationInterface {
    name = 'Pac1726851696712';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "tg_users" ("id" SERIAL NOT NULL, "user_name" character varying NOT NULL, "extension" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9ca7cb460931bb8da0685e39fc8" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "tg_config" ("id" SERIAL NOT NULL, "is_test" character varying NOT NULL, "chat_id" character varying NOT NULL, "message" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "client_id" integer, CONSTRAINT "UQ_3be3fb7d1cfbf5814e661a27b4e" UNIQUE ("is_test"), CONSTRAINT "UQ_d6c6a7ddf31152ccb916abda171" UNIQUE ("chat_id"), CONSTRAINT "PK_a02b8f031ca182904024e270af7" PRIMARY KEY ("id"))`,
        );
        await queryRunner.query(
            `CREATE TABLE "tg_config_tg_users_tg_users" ("tgConfigId" integer NOT NULL, "tgUsersId" integer NOT NULL, CONSTRAINT "PK_f05b7aa6ceefd6717c4a6e9e9f5" PRIMARY KEY ("tgConfigId", "tgUsersId"))`,
        );
        await queryRunner.query(`CREATE INDEX "IDX_db71f8679386b84d9ccdfe41f3" ON "tg_config_tg_users_tg_users" ("tgConfigId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8cfd4cdc035baac89b6f1881e1" ON "tg_config_tg_users_tg_users" ("tgUsersId") `);
        await queryRunner.query(
            `ALTER TABLE "tg_config" ADD CONSTRAINT "FK_afc8437fc59c60a2e05d46a9d2b" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE "tg_config_tg_users_tg_users" ADD CONSTRAINT "FK_db71f8679386b84d9ccdfe41f3b" FOREIGN KEY ("tgConfigId") REFERENCES "tg_config"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE "tg_config_tg_users_tg_users" ADD CONSTRAINT "FK_8cfd4cdc035baac89b6f1881e19" FOREIGN KEY ("tgUsersId") REFERENCES "tg_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config_tg_users_tg_users" DROP CONSTRAINT "FK_8cfd4cdc035baac89b6f1881e19"`);
        await queryRunner.query(`ALTER TABLE "tg_config_tg_users_tg_users" DROP CONSTRAINT "FK_db71f8679386b84d9ccdfe41f3b"`);
        await queryRunner.query(`ALTER TABLE "tg_config" DROP CONSTRAINT "FK_afc8437fc59c60a2e05d46a9d2b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8cfd4cdc035baac89b6f1881e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db71f8679386b84d9ccdfe41f3"`);
        await queryRunner.query(`DROP TABLE "tg_config_tg_users_tg_users"`);
        await queryRunner.query(`DROP TABLE "tg_config"`);
        await queryRunner.query(`DROP TABLE "tg_users"`);
    }
}
