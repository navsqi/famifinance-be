import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedTransaction1743935671695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO transactions (id, account_id, category_id, amount, type, date, description, created_at, updated_at)
          VALUES 
            (uuid_generate_v4(), 'cdc6cee9-3e1e-4b58-9068-37ddaa9d0871', 'b8d197f1-fc0e-4971-87e3-3f74463cd348', 120000, 0, '2025-04-01', 'Lunch at restaurant', NOW(), NOW()),
            (uuid_generate_v4(), 'd71a37ce-6e75-430e-bf7f-a64fd00abf44', '9f6c29b7-d266-457d-87e1-7a6175ecad3e', 30000, 0, '2025-04-02', 'Online transport fare', NOW(), NOW()),
            (uuid_generate_v4(), '35da7db4-a22f-409d-a16a-747904698e1d', 'ee1f4355-cd28-4b2e-9593-f0156d87d74e', 450000, 1, '2025-04-03', 'Freelance payment', NOW(), NOW()),
            (uuid_generate_v4(), 'cdc6cee9-3e1e-4b58-9068-37ddaa9d0871', '3a995fd4-54d5-4c66-8121-08b808a03e70', 150000, 0, '2025-04-04', 'Movie night', NOW(), NOW()),
            (uuid_generate_v4(), 'd71a37ce-6e75-430e-bf7f-a64fd00abf44', 'cdfd44bc-72e0-4ae4-b30b-0c62407b0767', 25000, 0, '2025-04-05', 'Mobile data top-up', NOW(), NOW())
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM transactions
          WHERE description IN (
            'Lunch at restaurant',
            'Online transport fare',
            'Freelance payment',
            'Movie night',
            'Mobile data top-up'
          )
        `);
  }
}
