import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableTransactionFixColumnName1743935671694 implements MigrationInterface {
  name = 'AlterTableTransactionFixColumnName1743935671694';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "accountId"`);
    await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "categoryId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "categoryId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD "accountId" character varying NOT NULL`,
    );
  }
}
