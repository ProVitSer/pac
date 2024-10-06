import { MigrationInterface, QueryRunner } from "typeorm";

export class Pac1728239158048 implements MigrationInterface {
    name = 'Pac1728239158048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "smsId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "sms_send_status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "sms_send_result" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "sms_send_result" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "sms_send_status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sms" ALTER COLUMN "smsId" SET NOT NULL`);
    }

}
