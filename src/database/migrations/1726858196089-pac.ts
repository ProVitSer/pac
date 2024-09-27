import { MigrationInterface, QueryRunner } from 'typeorm';

export class Pac1726858196089 implements MigrationInterface {
    name = 'Pac1726858196089';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config_tg_users_tg_users" DROP CONSTRAINT "FK_8cfd4cdc035baac89b6f1881e19"`);
        await queryRunner.query(
            `ALTER TABLE "tg_config_tg_users_tg_users" ADD CONSTRAINT "FK_8cfd4cdc035baac89b6f1881e19" FOREIGN KEY ("tgUsersId") REFERENCES "tg_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tg_config_tg_users_tg_users" DROP CONSTRAINT "FK_8cfd4cdc035baac89b6f1881e19"`);
        await queryRunner.query(
            `ALTER TABLE "tg_config_tg_users_tg_users" ADD CONSTRAINT "FK_8cfd4cdc035baac89b6f1881e19" FOREIGN KEY ("tgUsersId") REFERENCES "tg_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }
}
