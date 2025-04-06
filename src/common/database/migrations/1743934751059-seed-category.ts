import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategory1743934751059 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO categories (id, created_at, updated_at, deleted_at, "name", description) VALUES('b8d197f1-fc0e-4971-87e3-3f74463cd348'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Food & Drinks', 'Expenses for meals, snacks, and beverages');
            INSERT INTO categories (id, created_at, updated_at, deleted_at, "name", description) VALUES('9f6c29b7-d266-457d-87e1-7a6175ecad3e'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Transportation', 'Public transport, fuel, taxi, and rideshare');
            INSERT INTO categories (id, created_at, updated_at, deleted_at, "name", description) VALUES('ee1f4355-cd28-4b2e-9593-f0156d87d74e'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Utilities', 'Electricity, water, internet, and other bills');
            INSERT INTO categories (id, created_at, updated_at, deleted_at, "name", description) VALUES('3a995fd4-54d5-4c66-8121-08b808a03e70'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Entertainment', 'Movies, streaming, games, and leisure');
            INSERT INTO categories (id, created_at, updated_at, deleted_at, "name", description) VALUES('cdfd44bc-72e0-4ae4-b30b-0c62407b0767'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Health', 'Medical expenses, insurance, and wellness');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM categories
          WHERE name IN (
            'Food & Drinks',
            'Transportation',
            'Utilities',
            'Entertainment',
            'Health'
          )
        `);
  }
}
