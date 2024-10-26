import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1729937858829 implements MigrationInterface {
    name = 'Pac1729937858829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sms_config" ADD "sms_text" character varying NOT NULL DEFAULT 'Здравствуйте, к сожалению все менеджеры были заняты, мы свяжемся с вами в ближашйее время!'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sms_config" DROP COLUMN "sms_text"`);
    }

}
