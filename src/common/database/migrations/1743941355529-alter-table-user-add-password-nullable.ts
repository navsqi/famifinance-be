import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUserAddPasswordNullable1743941355529 implements MigrationInterface {
    name = 'AlterTableUserAddPasswordNullable1743941355529'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
