/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { diagnostics: false }],
  },
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: [
    'widget-figjam/widget-src/**/*.ts',
    '!widget-figjam/widget-src/**/README*',
    '!widget-figjam/widget-src/**/tsconfig.json'
  ],
  coverageThreshold: {
    global: {
      statements: 70,
      branches: 60,
      functions: 60,
      lines: 70
    }
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup-figma.ts']
  ,moduleNameMapper: {
    '^react/jsx-runtime$': '<rootDir>/test/react-jsx-runtime.js'
  }
};
