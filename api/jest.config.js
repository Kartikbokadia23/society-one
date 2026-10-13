module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleNameMapper: { '^@societyone/shared$': '<rootDir>/../shared/src/index.ts' },
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: { module: 'commonjs', target: 'ES2022', strict: true, esModuleInterop: true, skipLibCheck: true } }] },
};
