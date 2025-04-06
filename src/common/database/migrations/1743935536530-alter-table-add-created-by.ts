import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableAddCreatedBy1743935536530 implements MigrationInterface {
  name = 'AlterTableAddCreatedBy1743935536530';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "accounts" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "accounts" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "categories" ADD "updated_by" uuid`);
    await queryRunner.query(`ALTER TABLE "transactions" ADD "created_by" uuid`);
    await queryRunner.query(`ALTER TABLE "transactions" ADD "updated_by" uuid`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "created_by"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "updated_by"`);
    await queryRunner.query(`ALTER TABLE "accounts" DROP COLUMN "created_by"`);
  }
}
