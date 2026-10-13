module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  moduleNameMapper: { '^@societyone/shared$': '<rootDir>/../shared/src/index.ts' },
};
