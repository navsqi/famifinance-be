import { execSync } from 'child_process';

// example command: yarn migration:generate create-table-user
// the migration file will be placed in /src/common/database/migrations
const name = process.argv[2];

if (!name) {
  console.error('❌ Please provide a migration name.');
  process.exit(1);
}

const outputPath = `./src/common/database/migrations/${name}`;
const command = `ts-node -P ./tsconfig.json -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d ./src/common/database/typeorm.config.ts ${outputPath}`;

console.log(`🚀 Generating migration: ${name}`);
try {
  execSync(command, { stdio: 'inherit', shell: true });
  console.log('✅ Migration file generated at:', outputPath);
} catch (err) {
  console.error('❌ Failed to generate migration:', err.message);
}
