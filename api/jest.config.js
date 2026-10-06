module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleNameMapper: { '^@societyone/shared$': '<rootDir>/../shared/src/index.ts' },
  transform: { '^.+\\.ts$': ['ts-jest', { tsconfig: { module: 'commonjs', esModuleInterop: true, strict: true, skipLibCheck: true, types: ['node', 'jest'] } }] },
};
