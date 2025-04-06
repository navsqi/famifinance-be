import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1743934527987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO users (id, created_at, updated_at, deleted_at, full_name, email, is_active) VALUES('2461d062-1c3a-47a6-85a6-9a302f4ca8cf'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Nauval Shidqi', 'nauval@example.com', true);
          INSERT INTO users (id, created_at, updated_at, deleted_at, full_name, email, is_active) VALUES('bbcab44f-6bcb-4e22-9b23-601f31e3f17c'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'Jane Doe', 'jane@example.com', true);
          INSERT INTO users (id, created_at, updated_at, deleted_at, full_name, email, is_active) VALUES('1595f3d9-7fbc-4657-9c1e-a1312fd5d147'::uuid, '2025-04-06 17:26:55.845', '2025-04-06 17:26:55.845', NULL, 'John Smith', 'john@example.com', false);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM users 
          WHERE email IN ('nauval@example.com', 'jane@example.com', 'john@example.com')
        `);
  }
}
