import { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: pathsToModuleNameMapper(
    {
      '@common/*': ['src/common/*'],
      '@modules/*': ['src/modules/*'],
    },
    {
      prefix: '<rootDir>/',
    },
  ),
  testMatch: ['<rootDir>/src/**/*.spec.ts'], // 👈 hanya cari *.spec.ts di src/
  moduleFileExtensions: ['js', 'json', 'ts'],
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary'],
};

export default config;
