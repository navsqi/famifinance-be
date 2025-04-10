import { execSync } from 'child_process';
import { join } from 'path';

// example command: yarn migration:create create-user-seeder
// the migration file will be placed in /src/common/database/migrations
const migrationName = process.argv[2];

if (!migrationName) {
  console.error('❌ Please provide a migration name.');
  process.exit(1);
}

const outputPath = join('src/common/database/migrations', migrationName);

const command = `ts-node -P tsconfig.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create ${outputPath}`;

console.log(`🚀 Creating migration: ${migrationName}`);
try {
  execSync(command, { stdio: 'inherit', shell: true });
  console.log('✅ Migration file created at:', outputPath);
} catch (err) {
  console.error('❌ Failed to create migration:', err.message);
}
