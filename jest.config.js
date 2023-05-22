module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^app/(.*)$': '<rootDir>/src/app/$1'
  },
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
  collectCoverageFrom: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'pages/**/*.vue',
    'lib/**/*.ts',
    'plugins/**/*.ts',
    'store/**/*.ts',
    'src/**/*.ts'
  ],
  testMatch: ['**/*.steps.ts', '**/*.spec.ts'],
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'node'
}
