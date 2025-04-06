import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAccount1743934806174 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                INSERT INTO accounts (id, created_at, updated_at, deleted_at, account_name, description) VALUES('cdc6cee9-3e1e-4b58-9068-37ddaa9d0871'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Bank Mandiri', 'Primary account for daily use');
                INSERT INTO accounts (id, created_at, updated_at, deleted_at, account_name, description) VALUES('d71a37ce-6e75-430e-bf7f-a64fd00abf44'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Bank BCA', 'Secondary account for daily use');
                INSERT INTO accounts (id, created_at, updated_at, deleted_at, account_name, description) VALUES('35da7db4-a22f-409d-a16a-747904698e1d'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Tunai', 'Cash');
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
              DELETE FROM accounts
              WHERE account_name IN ('Main Account', 'Savings', 'Investments')
            `);
  }
}
